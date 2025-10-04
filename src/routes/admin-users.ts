import { Router, Request, Response } from "express";
import { superAdminAuth } from "../auth/adminAuth";
import UserModel from "../models/users";
import UserAuthModel from "../models/userAuth";
import { hash } from "bcrypt";

const router = Router();

// GET /api/admin/users - Get all users (admin only)
router.get("/users", async (req: Request, res: Response): Promise<any> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const role = req.query.role as string;
    const isActive = req.query.isActive as string;

    let filter: any = {};
    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === "true";

    const users = await UserModel.find(filter)
      .select("-__v")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await UserModel.countDocuments(filter);

    return res.status(200).json({
      success: true,
      data: users,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: users.length,
        totalRecords: total,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// POST /api/admin/users/create-admin - Create admin user (super admin only)
router.post(
  "/users/create-admin",
  superAdminAuth,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Name, email, and password are required",
        });
      }

      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User with this email already exists",
        });
      }

      // Create user
      const user = new UserModel({
        name,
        email,
        role: "admin",
        isActive: true,
      });
      const savedUser = await user.save();

      // Create auth entry
      const hashedPassword = await hash(password, 10);
      const userAuth = new UserAuthModel({
        emailOrPhone: email,
        password: hashedPassword,
        id: savedUser._id,
        isVerified: true,
        verificationCode: "000000", // Admin accounts are pre-verified
      });
      await userAuth.save();

      return res.status(201).json({
        success: true,
        message: "Admin user created successfully",
        data: savedUser,
      });
    } catch (error) {
      console.error("Error creating admin user:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// PUT /api/admin/users/:id/role - Update user role (super admin only)
router.put(
  "/users/:id/role",
  superAdminAuth,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { role } = req.body;

      if (!role || !["user", "admin"].includes(role)) {
        return res.status(400).json({
          success: false,
          message: "Valid role is required (user or admin)",
        });
      }

      const user = await UserModel.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true, runValidators: true }
      ).select("-__v");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: `User role updated to ${role}`,
        data: user,
      });
    } catch (error) {
      console.error("Error updating user role:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// PUT /api/admin/users/:id/status - Toggle user active status
router.put(
  "/users/:id/status",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await UserModel.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      user.isActive = !user.isActive;
      await user.save();

      return res.status(200).json({
        success: true,
        message: `User ${
          user.isActive ? "activated" : "deactivated"
        } successfully`,
        data: user,
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// GET /api/admin/users/stats - Get user statistics
router.get(
  "/users/stats",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const [totalUsers, activeUsers, inactiveUsers, adminUsers, regularUsers] =
        await Promise.all([
          UserModel.countDocuments({}),
          UserModel.countDocuments({ isActive: true }),
          UserModel.countDocuments({ isActive: false }),
          UserModel.countDocuments({ role: "admin" }),
          UserModel.countDocuments({ role: "user" }),
        ]);

      return res.status(200).json({
        success: true,
        data: {
          total: totalUsers,
          active: activeUsers,
          inactive: inactiveUsers,
          admins: adminUsers,
          users: regularUsers,
        },
      });
    } catch (error) {
      console.error("Error fetching user stats:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

export default router;
