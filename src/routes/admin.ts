import { Router, Request, Response } from "express";
import { adminAuth } from "../auth/adminAuth";
import AdminTemplesRouter from "./admin-temples";
import AdminPujasRouter from "./admin-pujas";
import AdminBookingsRouter from "./admin-bookings";
import AdminUsersRouter from "./admin-users";

const router = Router();

// Apply admin authentication to all admin routes
router.use(adminAuth);

// Mount admin sub-routes
router.use("/temples", AdminTemplesRouter);
router.use("/pujas", AdminPujasRouter);
router.use("/bookings", AdminBookingsRouter);
router.use("/", AdminUsersRouter); // User management routes directly under /admin

// Admin dashboard endpoint
router.get("/dashboard", async (req: Request, res: Response): Promise<any> => {
  try {
    // This could be expanded to include dashboard-specific data
    return res.status(200).json({
      success: true,
      message: "Admin dashboard endpoint",
      data: {
        message: "Welcome to Bhakti App Admin Panel",
        endpoints: {
          temples: "/api/admin/temples",
          pujas: "/api/admin/pujas",
          bookings: "/api/admin/bookings",
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
