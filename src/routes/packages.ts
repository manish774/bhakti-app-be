import { Router, Request, Response, NextFunction } from "express";
import PackageModel from "../models/package-model";
import { auth, getCurrentUserId } from "../auth/auth";
import { packageAllowedProps } from "../utils/allowedPropsToUpdate";

const router = Router();

/**
 * CREATE PACKAGE
 */
router.post(
  "/create",
  auth,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const isValid = packageAllowedProps.create.isValid({ data: req.body });
      if (!isValid) {
        return res.status(400).json(packageAllowedProps.create.error);
      }

      const { name, numberOfPerson, title, price, description, isPopular } =
        req.body;

      const payload = new PackageModel({
        name,
        numberOfPerson,
        title,
        price,
        description,
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
 * UPDATE PACKAGE
 */
router.patch(
  "/update",
  auth,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { id, ...updateData } = req.body;

      if (!id) {
        return res.status(400).json("Missing package id");
      }

      const isValid = packageAllowedProps.update.isValid({
        data: updateData,
      });

      if (!isValid) {
        return res.status(400).json(packageAllowedProps.update.error);
      }

      const response = await PackageModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!response) {
        return res.status(400).json("Invalid package id");
      }

      res.json(response);
    } catch (e: any) {
      res.status(400).json(e?.message);
    }
  }
);

/**
 * DELETE PACKAGE
 */
router.delete(
  "/delete",
  auth,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json("Missing package id");
      }

      const deleted = await PackageModel.findByIdAndDelete(id);

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
 * GET ALL PACKAGES
 */
/**
 * GET ALL PACKAGES (with pagination)
 * GET /get?page=1&limit=10
 */
router.get("/get", auth, async (req: Request, res: Response): Promise<any> => {
  try {
    // Read query params
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit as string) || 10, 1);

    const skip = (page - 1) * limit;

    // Fetch data
    const [packages, total] = await Promise.all([
      PackageModel.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      PackageModel.countDocuments(),
    ]);

    res.json({
      data: packages,
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
 * GET PACKAGE BY ID
 * GET /get/:id
 */
router.get(
  "/get/:id",
  auth,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json("Missing package id");
      }

      const packageData = await PackageModel.findById(id);

      if (!packageData) {
        return res.status(404).json("Package not found");
      }

      res.json(packageData);
    } catch (e: any) {
      res.status(400).json("Invalid package id");
    }
  }
);

export default router;
