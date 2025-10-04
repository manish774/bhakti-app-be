import { Router, Request, Response } from "express";
import TempleModel from "../models/temple-model";
import { componentValidate } from "../utils/validate";

const router = Router();

// GET /api/admin/temples - Get all temples
router.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const temples = await TempleModel.find({})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await TempleModel.countDocuments({});

    return res.status(200).json({
      success: true,
      data: temples,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: temples.length,
        totalRecords: total,
      },
    });
  } catch (error) {
    console.error("Error fetching temples:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// GET /api/admin/temples/:id - Get temple by ID
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const temple = await TempleModel.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: temple,
    });
  } catch (error) {
    console.error("Error fetching temple:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// POST /api/admin/temples - Create new temple
router.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const temple = new TempleModel(req.body);
    const savedTemple = await temple.save();

    return res.status(201).json({
      success: true,
      message: "Temple created successfully",
      data: savedTemple,
    });
  } catch (error) {
    console.error("Error creating temple:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// PUT /api/admin/temples/:id - Update temple
router.put("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const temple = await TempleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Temple updated successfully",
      data: temple,
    });
  } catch (error) {
    console.error("Error updating temple:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// DELETE /api/admin/temples/:id - Delete temple
router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const temple = await TempleModel.findByIdAndDelete(req.params.id);

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Temple deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting temple:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// POST /api/admin/temples/:id/packages - Add package to temple
router.post(
  "/:id/packages",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const temple = await TempleModel.findById(req.params.id);

      if (!temple) {
        return res.status(404).json({
          success: false,
          message: "Temple not found",
        });
      }

      // Check if package ID already exists
      const existingPackage = temple.packages.find(
        (pkg) => pkg.id === req.body.id
      );
      if (existingPackage) {
        return res.status(400).json({
          success: false,
          message: "Package with this ID already exists",
        });
      }

      temple.packages.push(req.body);
      await temple.save();

      return res.status(201).json({
        success: true,
        message: "Package added successfully",
        data: temple,
      });
    } catch (error) {
      console.error("Error adding package:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// PUT /api/admin/temples/:id/packages/:packageId - Update package
router.put(
  "/:id/packages/:packageId",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const temple = await TempleModel.findById(req.params.id);

      if (!temple) {
        return res.status(404).json({
          success: false,
          message: "Temple not found",
        });
      }

      const packageIndex = temple.packages.findIndex(
        (pkg) => pkg.id === req.params.packageId
      );
      if (packageIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Package not found",
        });
      }

      temple.packages[packageIndex] = {
        ...temple.packages[packageIndex],
        ...req.body,
      };
      await temple.save();

      return res.status(200).json({
        success: true,
        message: "Package updated successfully",
        data: temple,
      });
    } catch (error) {
      console.error("Error updating package:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// DELETE /api/admin/temples/:id/packages/:packageId - Delete package
router.delete(
  "/:id/packages/:packageId",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const temple = await TempleModel.findById(req.params.id);

      if (!temple) {
        return res.status(404).json({
          success: false,
          message: "Temple not found",
        });
      }

      const packageIndex = temple.packages.findIndex(
        (pkg) => pkg.id === req.params.packageId
      );
      if (packageIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Package not found",
        });
      }

      temple.packages.splice(packageIndex, 1);
      await temple.save();

      return res.status(200).json({
        success: true,
        message: "Package deleted successfully",
        data: temple,
      });
    } catch (error) {
      console.error("Error deleting package:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

export default router;
