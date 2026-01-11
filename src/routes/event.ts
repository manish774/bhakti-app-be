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
 * CREATE EVENT
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
 * UPDATE EVENT
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
 * DELETE EVENT
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
 * GET ALL EVENTS
 */
router.get("/get", auth, async (req: Request, res: Response): Promise<any> => {
  try {
    // Read query params
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit as string) || 10000, 1);

    const skip = (page - 1) * limit;

    // Fetch data with pagination
    const [events, total] = await Promise.all([
      EventModel.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      EventModel.countDocuments(),
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
 * GET EVENTS BY TEMPLE
 * /getbytemple?templeId=xxx
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
