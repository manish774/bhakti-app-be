import { Router, Request, Response, NextFunction } from "express";
import PanditModel from "../models/pandit-model";
import { auth } from "../auth/auth";
import { panditAllowedProps } from "../utils/allowedPropsToUpdate";

const router = Router();

/**
 * @swagger
 * /api/pandit/create:
 *   post:
 *     summary: Create a new pandit
 *     tags: [Pandits]
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
 *               - name
 *               - about
 *               - address
 *               - phone
 *               - specialization
 *               - templeAssociatedId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pandit Sharma
 *               about:
 *                 type: string
 *               address:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               extraInfo:
 *                 type: string
 *               specialization:
 *                 type: array
 *                 items:
 *                   type: string
 *               templeAssociatedId:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Pandit created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pandit'
 *       400:
 *         description: Validation error
 */
router.post(
  "/create",
  auth,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const isValid = panditAllowedProps.create.isValid({ data: req.body });
      if (!isValid) {
        return res.status(400).json(panditAllowedProps.create.error);
      }

      const {
        name,
        about,
        address,
        email,
        phone,
        extraInfo,
        specialization,
        templeAssociatedId,
      } = req.body;

      const payload = new PanditModel({
        name,
        about,
        address,
        email,
        phone,
        extraInfo,
        specialization,
        templeAssociatedId,
      });

      const response = await payload.save();
      res.json(response);
    } catch (e: any) {
      res.status(400).json(e?.message);
    }
  }
);

/**
 * @swagger
 * /api/pandit/update:
 *   patch:
 *     summary: Update a pandit
 *     tags: [Pandits]
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
 *                 description: Pandit ID
 *               name:
 *                 type: string
 *               about:
 *                 type: string
 *               address:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               extraInfo:
 *                 type: string
 *               specialization:
 *                 type: array
 *                 items:
 *                   type: string
 *               templeAssociatedId:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Pandit updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pandit'
 *       400:
 *         description: Missing or invalid pandit id
 */
router.patch(
  "/update",
  auth,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { id, ...updateData } = req.body;

      if (!id) {
        return res.status(400).json("Missing pandit id");
      }

      const isValid = panditAllowedProps.update.isValid({
        data: updateData,
      });

      if (!isValid) {
        return res.status(400).json(panditAllowedProps.update.error);
      }

      const response = await PanditModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!response) {
        return res.status(400).json("Invalid pandit id");
      }

      res.json(response);
    } catch (e: any) {
      res.status(400).json(e?.message);
    }
  }
);

/**
 * @swagger
 * /api/pandit/delete:
 *   delete:
 *     summary: Delete a pandit
 *     tags: [Pandits]
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
 *                 description: Pandit ID to delete
 *     responses:
 *       200:
 *         description: Pandit deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pandit'
 *       400:
 *         description: Missing or invalid pandit id
 */
router.delete(
  "/delete",
  auth,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json("Missing pandit id");
      }

      const deleted = await PanditModel.findByIdAndDelete(id);

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
 * /api/pandit/get:
 *   get:
 *     summary: Get all pandits
 *     tags: [Pandits]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all pandits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pandit'
 */
router.get("/get", auth, async (req: Request, res: Response): Promise<any> => {
  try {
    const pandits = await PanditModel.find();
    res.json(pandits);
  } catch (e: any) {
    res.status(400).json(e?.message);
  }
});

/**
 * @swagger
 * /api/pandit/getbytemple:
 *   get:
 *     summary: Get pandits by temple ID
 *     tags: [Pandits]
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
 *         description: List of pandits for the temple
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pandit'
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

      const pandits = await PanditModel.find({
        templeAssociatedId: { $in: [templeId] },
      });

      res.json(pandits);
    } catch (e: any) {
      res.status(400).json(e?.message);
    }
  }
);

export default router;
