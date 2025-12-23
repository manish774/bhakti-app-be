import { Router, Request, Response } from "express";
import BookingModel from "../models/booking-model";
import PujaModel from "../models/puja-model";
import TempleModel from "../models/temple-model";
import UserModel from "../models/users";

const router = Router();

// GET /api/admin/bookings - Get all bookings
router.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const status = req.query.status;
    const paymentStatus = req.query.paymentStatus;
    const templeId = req.query.templeId;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;

    let filter: any = {};

    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    if (templeId) filter.templeId = templeId;

    if (fromDate || toDate) {
      filter.pujaDate = {};
      if (fromDate) filter.pujaDate.$gte = new Date(fromDate as string);
      if (toDate) filter.pujaDate.$lte = new Date(toDate as string);
    }

    const bookings = await BookingModel.find(filter)
      .populate("userId", "name email")
      .populate("pujaId", "name coreId startPrice")
      .populate("templeId", "name location")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await BookingModel.countDocuments(filter);

    return res.status(200).json({
      success: true,
      data: bookings,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: bookings.length,
        totalRecords: total,
      },
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// GET /api/admin/bookings/:id - Get booking by ID
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const booking = await BookingModel.findById(req.params.id)
      .populate("userId", "name email")
      .populate("pujaId", "name coreId startPrice description")
      .populate("templeId", "name location packages");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// POST /api/admin/bookings - Create new booking (admin can create on behalf of users)
router.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    // Verify user exists
    const user = await UserModel.findById(req.body.userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify puja exists
    const puja = await PujaModel.findById(req.body.pujaId);
    if (!puja) {
      return res.status(400).json({
        success: false,
        message: "Puja not found",
      });
    }

    // Verify temple exists
    const temple = await TempleModel.findById(req.body.templeId);
    if (!temple) {
      return res.status(400).json({
        success: false,
        message: "Temple not found",
      });
    }

    // Verify package exists in temple
    // const packageExists = temple.packages.some(
    //   (pkg) => pkg.id === req.body.packageId
    // );
    // if (!packageExists) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Package not found in temple",
    //   });
    // }

    const booking = new BookingModel(req.body);
    const savedBooking = await booking.save();

    // Populate references in response
    await savedBooking.populate([
      { path: "userId", select: "name email" },
      { path: "pujaId", select: "name coreId startPrice" },
      { path: "templeId", select: "name location" },
    ]);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: savedBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);

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

// PUT /api/admin/bookings/:id - Update booking
router.put("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const booking = await BookingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate([
      { path: "userId", select: "name email" },
      { path: "pujaId", select: "name coreId startPrice" },
      { path: "templeId", select: "name location" },
    ]);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error updating booking:", error);

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

// PUT /api/admin/bookings/:id/status - Update booking status
router.put("/:id/status", async (req: Request, res: Response): Promise<any> => {
  try {
    const { status, notes } = req.body;

    if (
      !status ||
      !["pending", "confirmed", "completed", "cancelled"].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Valid status is required (pending, confirmed, completed, cancelled)",
      });
    }

    const updateData: any = { status };
    if (notes) updateData.notes = notes;

    const booking = await BookingModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate([
      { path: "userId", select: "name email" },
      { path: "pujaId", select: "name coreId startPrice" },
      { path: "templeId", select: "name location" },
    ]);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// PUT /api/admin/bookings/:id/payment-status - Update payment status
router.put(
  "/:id/payment-status",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { paymentStatus, paymentId } = req.body;

      if (
        !paymentStatus ||
        !["pending", "paid", "failed", "refunded"].includes(paymentStatus)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Valid payment status is required (pending, paid, failed, refunded)",
        });
      }

      const updateData: any = { paymentStatus };
      if (paymentId) updateData.paymentId = paymentId;

      const booking = await BookingModel.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      ).populate([
        { path: "userId", select: "name email" },
        { path: "pujaId", select: "name coreId startPrice" },
        { path: "templeId", select: "name location" },
      ]);

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Payment status updated successfully",
        data: booking,
      });
    } catch (error) {
      console.error("Error updating payment status:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// PUT /api/admin/bookings/:id/video - Upload video for completed puja
router.put("/:id/video", async (req: Request, res: Response): Promise<any> => {
  try {
    const { videoUrl } = req.body;

    if (!videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Video URL is required",
      });
    }

    const booking = await BookingModel.findByIdAndUpdate(
      req.params.id,
      {
        videoUrl,
        videoUploadedAt: new Date(),
      },
      { new: true }
    ).populate([
      { path: "userId", select: "name email" },
      { path: "pujaId", select: "name coreId startPrice" },
      { path: "templeId", select: "name location" },
    ]);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// GET /api/admin/bookings/stats/overview - Get booking statistics
router.get(
  "/stats/overview",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );

      const [
        totalBookings,
        todayBookings,
        monthlyBookings,
        pendingBookings,
        confirmedBookings,
        completedBookings,
        totalRevenue,
        monthlyRevenue,
      ] = await Promise.all([
        BookingModel.countDocuments({}),
        BookingModel.countDocuments({
          createdAt: { $gte: startOfDay },
        }),
        BookingModel.countDocuments({
          createdAt: { $gte: startOfMonth },
        }),
        BookingModel.countDocuments({ status: "pending" }),
        BookingModel.countDocuments({ status: "confirmed" }),
        BookingModel.countDocuments({ status: "completed" }),
        BookingModel.aggregate([
          { $match: { paymentStatus: "paid" } },
          { $group: { _id: null, total: { $sum: "$totalAmount" } } },
        ]),
        BookingModel.aggregate([
          {
            $match: {
              paymentStatus: "paid",
              createdAt: { $gte: startOfMonth },
            },
          },
          { $group: { _id: null, total: { $sum: "$totalAmount" } } },
        ]),
      ]);

      return res.status(200).json({
        success: true,
        data: {
          bookings: {
            total: totalBookings,
            today: todayBookings,
            monthly: monthlyBookings,
            pending: pendingBookings,
            confirmed: confirmedBookings,
            completed: completedBookings,
          },
          revenue: {
            total: totalRevenue[0]?.total || 0,
            monthly: monthlyRevenue[0]?.total || 0,
          },
        },
      });
    } catch (error) {
      console.error("Error fetching booking stats:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

export default router;
