import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import UserModel from "../models/users";
import { authKey } from "./auth";

export interface AdminReqs extends Request {
  user: any;
  admin: any;
}

// Admin authentication middleware
export const adminAuth = async (
  req: AdminReqs,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const userDetail: any = verify(token, authKey);
    const user = await UserModel.findById(userDetail._id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. User not found.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Account is deactivated.",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    req.user = user;
    req.admin = user; // For admin-specific properties
    next();
  } catch (error) {
    console.error("Admin auth error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

// Optional: Super admin check (for critical operations)
export const superAdminAuth = async (
  req: AdminReqs,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // First check if user is admin
    await adminAuth(req, res, () => {});

    // Additional super admin check (you can add email-based or other criteria)
    const superAdminEmails = process.env.SUPER_ADMIN_EMAILS?.split(",") || [
      "admin@bhaktiapp.com",
    ];

    if (!superAdminEmails.includes(req.user.email)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Super admin privileges required.",
      });
    }

    next();
  } catch (error) {
    console.error("Super admin auth error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

// Get current admin user details
export const getCurrentAdminId = async (req: Request): Promise<any> => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;

    if (!token) throw new Error("No token provided");

    const userDetail: any = verify(token, authKey);
    const user = await UserModel.findById(userDetail._id);

    if (!user || user.role !== "admin" || !user.isActive) {
      throw new Error("Invalid admin user");
    }

    return userDetail._id;
  } catch (error) {
    throw error;
  }
};
