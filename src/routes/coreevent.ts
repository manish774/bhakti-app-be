import { Router, Request, Response, NextFunction } from "express";
import CoreEventModel, { CoreEventIds } from "../models/coreevents.model";
import { auth } from "../auth/auth";
import { coreEventAllowedProps } from "../utils/allowedPropsToUpdate";

const router = Router();

/**
 * CREATE CORE EVENT
 */
router.post(
  "/create",
  auth,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const isValid = coreEventAllowedProps.create.isValid({ data: req.body });
      if (!isValid) {
        return res.status(400).json(coreEventAllowedProps.create.error);
      }

      const { type, title, description, icon, color, shadowColor, visible } =
        req.body;

      if (!Object.values(CoreEventIds).includes(type)) {
        return res.status(400).json("Invalid core event type");
      }

      // Prevent duplicate core event type
      const existing = await CoreEventModel.findOne({ type });
      if (existing) {
        return res.status(400).json("Core event type already exists");
      }

      const payload = new CoreEventModel({
        type,
        title,
        description,
        icon,
        color,
        shadowColor,
        visible,
      });

      const response = await payload.save();
      res.json(response);
    } catch (e: any) {
      if (
        e?.code === 11000 ||
        (e?.message && e.message.includes("duplicate key"))
      ) {
        return res.status(400).json("Duplicate core event");
      }
      res.status(400).json(e?.message);
    }
  }
);

/**
 * UPDATE CORE EVENT
 */
router.patch(
  "/update",
  auth,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { type, ...updateData } = req.body;

      if (!type) {
        return res.status(400).json("Missing core event type");
      }

      const isValid = coreEventAllowedProps.update.isValid({
        data: updateData,
      });

      if (!isValid) {
        return res.status(400).json(coreEventAllowedProps.update.error);
      }

      // Use `type` (enum) to locate the document
      const response = await CoreEventModel.findOneAndUpdate(
        { type },
        updateData,
        {
          new: true,
        }
      );

      if (!response) {
        return res.status(400).json("Invalid core event type");
      }

      res.json(response);
    } catch (e: any) {
      if (
        e?.code === 11000 ||
        (e?.message && e.message.includes("duplicate key"))
      ) {
        return res.status(400).json("Duplicate core event");
      }
      res.status(400).json(e?.message);
    }
  }
);

/**
 * DELETE CORE EVENT
 */
// router.delete(
//   "/delete",
//   auth,
//   async (req: Request, res: Response): Promise<any> => {
//     try {
//       const { id } = req.body;

//       if (!id) {
//         return res.status(400).json("Missing core event id");
//       }

//       const deleted = await CoreEventModel.findByIdAndDelete(id);

//       if (!deleted) {
//         return res.status(400).json("Invalid request");
//       }

//       res.json(deleted);
//     } catch (e: any) {
//       res.status(400).json(e?.message);
//     }
//   }
// );

/**
 * GET ALL CORE EVENTS (with pagination)
 * GET /get?page=1&limit=10
 */
router.get("/get", auth, async (req: Request, res: Response): Promise<any> => {
  try {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit as string) || 10, 1);

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      CoreEventModel.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      CoreEventModel.countDocuments(),
    ]);

    res.json({
      data,
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
 * GET CORE EVENTS BY IDS
 */
router.post(
  "/getByTypes",
  auth,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { types } = req.body;

      if (!Array.isArray(types) || types.length === 0) {
        return res.status(400).json("types must be a non-empty array");
      }

      const validTypes = types.filter((t: string) =>
        Object.values(CoreEventIds).includes(t as CoreEventIds)
      );

      const items = await CoreEventModel.find({ type: { $in: validTypes } });

      return res.status(200).json(items);
    } catch (e) {
      console.error("Error fetching core events by types:", e);
      return res.status(500).json("Internal server error");
    }
  }
);

export default router;
