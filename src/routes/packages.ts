import { Router, Request, Response, NextFunction } from "express";
import PackageModel from "../models/package-model";
import { auth, getCurrentUserId } from "../auth/auth";
import { packageAllowedProps } from "../utils/allowedPropsToUpdate";
import mongoose from "mongoose";

const router = Router();

/**
 * @swagger
 * /api/package/create:
 *   post:
 *     summary: Create a new package
 *     tags: [Packages]
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
 *               - numberOfPerson
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Basic Package
 *               numberOfPerson:
 *                 type: integer
 *                 minimum: 1
 *                 example: 5
 *               title:
 *                 type: string
 *                 example: Family Puja Package
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 example: 5000
 *               description:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     detail:
 *                       type: string
 *               isPopular:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       200:
 *         description: Package created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Package'
 *       400:
 *         description: Validation error
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
 * @swagger
 * /api/package/update:
 *   patch:
 *     summary: Update a package
 *     tags: [Packages]
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
 *                 description: Package ID
 *               name:
 *                 type: string
 *               numberOfPerson:
 *                 type: integer
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: array
 *                 items:
 *                   type: object
 *               isPopular:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Package updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Package'
 *       400:
 *         description: Missing or invalid package id
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
 * @swagger
 * /api/package/delete:
 *   delete:
 *     summary: Delete a package
 *     tags: [Packages]
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
 *                 description: Package ID to delete
 *     responses:
 *       200:
 *         description: Package deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Package'
 *       400:
 *         description: Missing or invalid package id
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
 * @swagger
 * /api/package/get:
 *   get:
 *     summary: Get all packages with pagination
 *     tags: [Packages]
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
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of packages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Package'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
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
 * @swagger
 * /api/package/getByIds:
 *   post:
 *     summary: Get packages by IDs
 *     tags: [Packages]
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
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: ObjectId
 *                 description: Array of package IDs
 *     responses:
 *       200:
 *         description: List of packages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Package'
 *       400:
 *         description: ids must be a non-empty array
 *       500:
 *         description: Internal server error
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

      const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));

      const packages = await PackageModel.find({
        _id: { $in: validIds },
      });

      return res.status(200).json(packages);
    } catch (e) {
      console.error("Error fetching packages by ids:", e);
      return res.status(500).json("Internal server error");
    }
  }
);

export default router;
