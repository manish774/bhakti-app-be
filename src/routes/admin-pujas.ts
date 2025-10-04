import { Router, Request, Response } from "express";
import PujaModel from "../models/puja-model";
import TempleModel from "../models/temple-model";

const router = Router();

// GET /api/admin/pujas - Get all pujas
router.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const isActive = req.query.isActive;
    const templeId = req.query.templeId;

    let filter: any = {};
    if (isActive !== undefined) {
      filter.isActive = isActive === "true";
    }
    if (templeId) {
      filter.templeId = templeId;
    }

    const pujas = await PujaModel.find(filter)
      .populate("templeId", "name location")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await PujaModel.countDocuments(filter);

    return res.status(200).json({
      success: true,
      data: pujas,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: pujas.length,
        totalRecords: total,
      },
    });
  } catch (error) {
    console.error("Error fetching pujas:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// GET /api/admin/pujas/:id - Get puja by ID
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const puja = await PujaModel.findById(req.params.id).populate("templeId");

    if (!puja) {
      return res.status(404).json({
        success: false,
        message: "Puja not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: puja,
    });
  } catch (error) {
    console.error("Error fetching puja:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// POST /api/admin/pujas - Create new puja
router.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    // Verify temple exists
    const temple = await TempleModel.findById(req.body.templeId);
    if (!temple) {
      return res.status(400).json({
        success: false,
        message: "Temple not found",
      });
    }

    const puja = new PujaModel(req.body);
    const savedPuja = await puja.save();

    // Populate temple data in response
    await savedPuja.populate("templeId", "name location");

    return res.status(201).json({
      success: true,
      message: "Puja created successfully",
      data: savedPuja,
    });
  } catch (error) {
    console.error("Error creating puja:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Puja with this core ID already exists",
      });
    }

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

// PUT /api/admin/pujas/:id - Update puja
router.put("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    // If templeId is being updated, verify it exists
    if (req.body.templeId) {
      const temple = await TempleModel.findById(req.body.templeId);
      if (!temple) {
        return res.status(400).json({
          success: false,
          message: "Temple not found",
        });
      }
    }

    const puja = await PujaModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("templeId", "name location");

    if (!puja) {
      return res.status(404).json({
        success: false,
        message: "Puja not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Puja updated successfully",
      data: puja,
    });
  } catch (error) {
    console.error("Error updating puja:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Puja with this core ID already exists",
      });
    }

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

// DELETE /api/admin/pujas/:id - Delete puja
router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const puja = await PujaModel.findByIdAndDelete(req.params.id);

    if (!puja) {
      return res.status(404).json({
        success: false,
        message: "Puja not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Puja deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting puja:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// POST /api/admin/pujas/:id/toggle-status - Toggle puja active status
router.post(
  "/:id/toggle-status",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const puja = await PujaModel.findById(req.params.id);

      if (!puja) {
        return res.status(404).json({
          success: false,
          message: "Puja not found",
        });
      }

      puja.isActive = !puja.isActive;
      await puja.save();

      await puja.populate("templeId", "name location");

      return res.status(200).json({
        success: true,
        message: `Puja ${
          puja.isActive ? "activated" : "deactivated"
        } successfully`,
        data: puja,
      });
    } catch (error) {
      console.error("Error toggling puja status:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// POST /api/admin/pujas/bulk-create - Create multiple pujas from temple data
router.post(
  "/bulk-create",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { data } = req.body;

      if (!Array.isArray(data)) {
        return res.status(400).json({
          success: false,
          message: "Data should be an array",
        });
      }

      const results = [];
      const errors = [];

      for (const item of data) {
        try {
          // First create or update temple
          let temple = await TempleModel.findOne({
            name: item.core.temple.name,
          });

          if (!temple) {
            temple = new TempleModel(item.core.temple);
            await temple.save();
          }

          // Then create puja
          const pujaData = {
            coreId: item.core.id,
            className: item.core.className,
            name: item.core.name,
            startPrice: item.core.startPrice,
            description: item.core.description,
            pujaDescription: item.core.pujaDescription,
            benefits: item.core.benifits, // Note: keeping original typo from data
            templeId: temple._id,
            metaData: item.core.metaData,
          };

          const existingPuja = await PujaModel.findOne({
            coreId: item.core.id,
          });

          if (existingPuja) {
            // Update existing puja
            Object.assign(existingPuja, pujaData);
            await existingPuja.save();
            await existingPuja.populate("templeId", "name location");
            results.push({ action: "updated", data: existingPuja });
          } else {
            // Create new puja
            const puja = new PujaModel(pujaData);
            await puja.save();
            await puja.populate("templeId", "name location");
            results.push({ action: "created", data: puja });
          }
        } catch (error) {
          errors.push({
            item: item.core.id || "unknown",
            error: error.message,
          });
        }
      }

      return res.status(200).json({
        success: true,
        message: "Bulk operation completed",
        results,
        errors,
        summary: {
          processed: data.length,
          successful: results.length,
          failed: errors.length,
        },
      });
    } catch (error) {
      console.error("Error in bulk create:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

export default router;
