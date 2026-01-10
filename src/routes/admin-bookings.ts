import { Router, Request, Response } from "express";
import BookingModel from "../models/booking-model";
import PujaModel from "../models/puja-model";
import TempleModel from "../models/temple-model";
import UserModel from "../models/users";
import PackageModel from "../models/package-model";
import CoreEventModel from "../models/coreevents.model";
import EventModel from "../models/event-model";

const router = Router();

/**
 * GET /api/admin/bookings
 */
router.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const { status, paymentStatus, templeId, fromDate, toDate } = req.query;

    const filter: any = {};

    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    if (templeId) filter.templeId = templeId;

    if (fromDate || toDate) {
      filter.pujaDate = {};
      if (fromDate) filter.pujaDate.$gte = new Date(fromDate as string);
      if (toDate) filter.pujaDate.$lte = new Date(toDate as string);
    }

    const [bookings, total] = await Promise.all([
      BookingModel.find(filter)
        .populate("userId", "name email")
        .populate("templeId", "name location")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      BookingModel.countDocuments(filter),
    ]);

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
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

/**
 * GET /api/admin/bookings/:id
 */
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const booking = await BookingModel.findById(req.params.id)
      .populate("userId", "name email")
      .populate("templeId", "name location packages");

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    return res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

/**
 * POST /api/admin/bookings
 */
router.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, templeId, coreType, eventId, packageId } = req.body;

    if (!coreType || !eventId) {
      return res.status(400).json({
        success: false,
        message: "coreType and eventId are required",
      });
    }

    const [user, temple, packages] = await Promise.all([
      CoreEventModel.findOne({ type: coreType, eventId: eventId }),
      EventModel.findById(eventId),
      UserModel.findById(userId),
      TempleModel.findById(templeId),
      PackageModel.findById(packageId),
    ]);

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    if (!temple)
      return res
        .status(400)
        .json({ success: false, message: "Temple not found" });
    if (!packages)
      return res
        .status(400)
        .json({ success: false, message: "Package not found" });

    const booking = await BookingModel.create(req.body);

    await booking.populate([
      { path: "userId", select: "name email" },
      { path: "templeId", select: "name location" },
    ]);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error: any) {
    console.error("Error creating booking:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

/**
 * PUT /api/admin/bookings/:id
 */
router.put("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const booking = await BookingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate([
      { path: "userId", select: "name email" },
      { path: "templeId", select: "name location" },
    ]);

    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error: any) {
    console.error("Error updating booking:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

/**
 * PUT /api/admin/bookings/:id/status
 */
router.put("/:id/status", async (req: Request, res: Response): Promise<any> => {
  try {
    const { status, notes } = req.body;

    if (!["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid booking status" });
    }

    const booking = await BookingModel.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    ).populate([
      { path: "userId", select: "name email" },
      { path: "templeId", select: "name location" },
    ]);

    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });

    return res
      .status(200)
      .json({ success: true, message: "Status updated", data: booking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

/**
 * PUT /api/admin/bookings/:id/payment-status
 */
router.put(
  "/:id/payment-status",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { paymentStatus, paymentId } = req.body;

      if (!["pending", "paid", "failed", "refunded"].includes(paymentStatus)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid payment status" });
      }

      const booking = await BookingModel.findByIdAndUpdate(
        req.params.id,
        { paymentStatus, paymentId },
        { new: true }
      ).populate([
        { path: "userId", select: "name email" },
        { path: "templeId", select: "name location" },
      ]);

      if (!booking)
        return res
          .status(404)
          .json({ success: false, message: "Booking not found" });

      return res
        .status(200)
        .json({ success: true, message: "Payment updated", data: booking });
    } catch (error) {
      console.error("Error updating payment:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
);

/**
 * PUT /api/admin/bookings/:id/video
 */
router.put("/:id/video", async (req: Request, res: Response): Promise<any> => {
  try {
    const { videoUrl } = req.body;

    if (!videoUrl) {
      return res
        .status(400)
        .json({ success: false, message: "videoUrl required" });
    }

    const booking = await BookingModel.findByIdAndUpdate(
      req.params.id,
      { videoUrl, videoUploadedAt: new Date() },
      { new: true }
    ).populate([
      { path: "userId", select: "name email" },
      { path: "templeId", select: "name location" },
    ]);

    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });

    return res
      .status(200)
      .json({ success: true, message: "Video uploaded", data: booking });
  } catch (error) {
    console.error("Error uploading video:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

/**
 * GET /api/admin/bookings/stats/overview
 */
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
        BookingModel.countDocuments(),
        BookingModel.countDocuments({ createdAt: { $gte: startOfDay } }),
        BookingModel.countDocuments({ createdAt: { $gte: startOfMonth } }),
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
      console.error("Error fetching stats:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
);

export default router;
