import { Router, Request, Response, NextFunction } from "express";
import EventModel from "../models/event-model";
import { auth } from "../auth/auth";
import { eventAllowedProps } from "../utils/allowedPropsToUpdate";

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

      const { eventName, templeId, packageId, pricePackageId, isPopular } =
        req.body;

      const payload = new EventModel({
        eventName,
        templeId,
        packageId,
        pricePackageId,
        isPopular,
      });

      const response = await payload.save();
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
    const events = await EventModel.find();
    res.json(events);
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
