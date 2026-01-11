import { Router, Request, Response, NextFunction } from "express";
import PanditModel from "../models/pandit-model";
import { auth } from "../auth/auth";
import { panditAllowedProps } from "../utils/allowedPropsToUpdate";

const router = Router();

/**
 * CREATE PANDIT
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
 * UPDATE PANDIT
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
 * DELETE PANDIT
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
 * GET ALL PANDITS
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
 * GET PANDITS BY TEMPLE
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
