import { Router, Request, Response, NextFunction } from "express";
import EventModel, { Ievent, PackageIddec } from "../models/event-model";
import { auth } from "../auth/auth";
import { eventAllowedProps } from "../utils/allowedPropsToUpdate";
import TempleModel from "../models/temple-model";
import PackageModel from "../models/package-model";
import { checkEmpty, validateIdsExist } from "./utils";
import CoreEventModel from "../models/coreevents.model";

const router = Router();

/**
 * @swagger
 * /api/event/create:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - coreEventId
 *               - eventName
 *               - templeId
 *               - packageId
 *               - pricePackageId
 *               - eventStartTime
 *               - eventExpirationTime
 *             properties:
 *               coreEventId:
 *                 type: string
 *                 example: coreevent_online_puja
 *               eventName:
 *                 type: string
 *                 example: Ganesh Chaturthi Puja
 *               templeId:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: ObjectId
 *               packageId:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: ObjectId
 *               pricePackageId:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     packageId:
 *                       type: string
 *                     price:
 *                       type: number
 *                     discount:
 *                       type: number
 *               eventStartTime:
 *                 type: string
 *                 format: date-time
 *               eventExpirationTime:
 *                 type: string
 *                 format: date-time
 *               isPopular:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       200:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Validation error
 */
router.post(
  "/create",
  auth,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const isValid = eventAllowedProps.create.isValid({ data: req.body });
      if (!isValid) {
        return res.status(400).json(eventAllowedProps.create.error);
      }

      const {
        coreEventId,
        eventName,
        templeId,
        packageId,
        pricePackageId,
        isPopular,
        eventExpirationTime,
        eventStartTime,
      }: Ievent = req.body;

      await validateIdsExist(TempleModel, templeId, "temple");
      await validateIdsExist(PackageModel, packageId, "packages");
      // await validateIdsExist(CoreEventModel, [coreEventId], "core events");
      const getPackageIds = pricePackageId.map(
        (x: PackageIddec) => x.packageId
      );
      await validateIdsExist(PackageModel, getPackageIds, "packages");

      await checkEmpty([{ propertyname: "Temple name", value: eventName }]);

      const coreEvent = await CoreEventModel.findOne({ type: coreEventId });
      if (!coreEvent) {
        return res.status(400).json("Invalid core event id");
      }

      const request = new EventModel({
        coreEventId,
        eventExpirationTime,
        eventStartTime,
        eventName,
        templeId,
        packageId,
        pricePackageId,
        isPopular,
      });

      const response = await request.save();
      res.json(response);
    } catch (e: any) {
      res.status(400).json(e?.message);
    }
  }
);

/**
 * @swagger
 * /api/event/update:
 *   patch:
 *     summary: Update an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 format: ObjectId
 *                 description: Event ID
 *               coreEventId:
 *                 type: string
 *               eventName:
 *                 type: string
 *               templeId:
 *                 type: array
 *                 items:
 *                   type: string
 *               packageId:
 *                 type: array
 *                 items:
 *                   type: string
 *               pricePackageId:
 *                 type: array
 *                 items:
 *                   type: object
 *               eventStartTime:
 *                 type: string
 *                 format: date-time
 *               eventExpirationTime:
 *                 type: string
 *                 format: date-time
 *               isPopular:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Invalid event id or validation error
 */
router.patch(
  "/update",
  auth,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { id, ...updateData } = req.body;

      if (!id) {
        return res.status(400).json("Missing event id");
      }

      const isValid = eventAllowedProps.update.isValid({
        data: updateData,
      });

      if (!isValid) {
        return res.status(400).json(eventAllowedProps.update.error);
      }

      const response = await EventModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!response) {
        return res.status(400).json("Invalid event id");
      }

      res.json(response);
    } catch (e: any) {
      res.status(400).json(e?.message);
    }
  }
);

/**
 * @swagger
 * /api/event/delete:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 format: ObjectId
 *                 description: Event ID to delete
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Missing or invalid event id
 */
router.delete(
  "/delete",
  auth,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json("Missing event id");
      }

      const deleted = await EventModel.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(400).json("Invalid request");
      }

      res.json(deleted);
    } catch (e: any) {
      res.status(400).json(e?.message);
    }
  }
);

/**
 * @swagger
 * /api/event/get:
 *   get:
 *     summary: Get all events with pagination and filters
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10000
 *         description: Items per page
 *       - in: query
 *         name: templeId
 *         schema:
 *           type: string
 *         description: Filter by temple ID
 *       - in: query
 *         name: coreEventId
 *         schema:
 *           type: string
 *         description: Filter by core event ID
 *       - in: query
 *         name: packageId
 *         schema:
 *           type: string
 *         description: Filter by package ID
 *       - in: query
 *         name: isPopular
 *         schema:
 *           type: boolean
 *         description: Filter by popular status
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */
router.get("/get", auth, async (req: Request, res: Response): Promise<any> => {
  try {
    // Read query params
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit as string) || 10000, 1);

    const skip = (page - 1) * limit;

    // Extract filter parameters
    const { templeId, coreEventId, packageId, isPopular } = req.query;

    // Build filter object
    const filter: any = {};

    if (templeId) {
      filter.templeId = { $in: [templeId] };
    }

    if (coreEventId) {
      filter.coreEventId = coreEventId;
    }

    if (packageId) {
      filter.packageId = { $in: [packageId] };
    }

    if (isPopular !== undefined) {
      filter.isPopular = isPopular === "true";
    }

    // Fetch data with pagination and filters
    const [events, total] = await Promise.all([
      EventModel.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
      EventModel.countDocuments(filter),
    ]);

    res.json({
      data: events,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (e: any) {
    res.status(400).json(e?.message);
  }
});

/**
 * @swagger
 * /api/event/getbytemple:
 *   get:
 *     summary: Get events by temple ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: templeId
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: Temple ID
 *     responses:
 *       200:
 *         description: List of events for the temple
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       400:
 *         description: Missing temple id
 */
router.get(
  "/getbytemple",
  auth,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const templeId = req.query.templeId as string;

      if (!templeId) {
        return res.status(400).json("Missing temple id");
      }

      const events = await EventModel.find({
        templeId: { $in: [templeId] },
      });

      res.json(events);
    } catch (e: any) {
      res.status(400).json(e?.message);
    }
  }
);

export default router;
