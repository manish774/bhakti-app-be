import { Router, Request, Response, NextFunction } from "express";
import CoreEventModel from "../models/coreevents.model";
import { auth } from "../auth/auth";
import { coreEventAllowedProps } from "../utils/allowedPropsToUpdate";
import mongoose from "mongoose";

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

      const { name, description, status, iconUrl } = req.body;

      const payload = new CoreEventModel({
        name,
        description,
        status,
        iconUrl,
      });

      const response = await payload.save();
      res.json(response);
    } catch (e: any) {
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
      const { id, ...updateData } = req.body;

      if (!id) {
        return res.status(400).json("Missing core event id");
      }

      const isValid = coreEventAllowedProps.update.isValid({
        data: updateData,
      });

      if (!isValid) {
        return res.status(400).json(coreEventAllowedProps.update.error);
      }

      const response = await CoreEventModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!response) {
        return res.status(400).json("Invalid core event id");
      }

      res.json(response);
    } catch (e: any) {
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
  "/getByIds",
  auth,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { ids } = req.body;

      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json("ids must be a non-empty array");
      }

      const validIds = ids.filter((id: string) =>
        mongoose.Types.ObjectId.isValid(id)
      );

      const items = await CoreEventModel.find({ _id: { $in: validIds } });

      return res.status(200).json(items);
    } catch (e) {
      console.error("Error fetching core events by ids:", e);
      return res.status(500).json("Internal server error");
    }
  }
);

export default router;
