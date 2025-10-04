/**
 * Script to create the first admin user
 * Run this script using: npm run create-admin or ts-node scripts/createAdmin.ts
 */

import dotenv from "dotenv";
dotenv.config();

import { DB } from "../src/database/database";
import UserModel from "../src/models/users";
import UserAuthModel from "../src/models/userAuth";
import { hash } from "bcrypt";

interface AdminUserData {
  name: string;
  email: string;
  password: string;
}

const createAdminUser = async (adminData: AdminUserData) => {
  try {
    await DB.connect();
    console.log("Connected to database");

    // Check if admin user already exists
    const existingUser = await UserModel.findOne({ email: adminData.email });
    if (existingUser) {
      console.log(`❌ User with email ${adminData.email} already exists`);
      process.exit(1);
    }

    // Create admin user
    const user = new UserModel({
      name: adminData.name,
      email: adminData.email,
      role: "admin",
      isActive: true,
    });
    const savedUser = await user.save();
    console.log(`✅ Admin user created: ${savedUser.email}`);

    // Create auth entry
    const hashedPassword = await hash(adminData.password, 10);
    const userAuth = new UserAuthModel({
      emailOrPhone: adminData.email,
      password: hashedPassword,
      id: savedUser._id,
      isVerified: true,
      verificationCode: "000000",
    });
    await userAuth.save();
    console.log(`✅ Admin authentication created for: ${savedUser.email}`);

    console.log("\n🎉 Admin user created successfully!");
    console.log("You can now login with:");
    console.log(`Email: ${adminData.email}`);
    console.log(`Password: ${adminData.password}`);
    console.log("\nAdmin API endpoints are available at: /api/admin/*");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  }
};

// Default admin user data (change these values)
const defaultAdminData: AdminUserData = {
  name: "Admin User",
  email: "admin@bhaktiapp.com",
  password: "Admin@123456",
};

// You can also pass custom data via command line arguments
const args = process.argv.slice(2);
if (args.length >= 3) {
  const customAdminData: AdminUserData = {
    name: args[0],
    email: args[1],
    password: args[2],
  };
  createAdminUser(customAdminData);
} else {
  console.log("Creating default admin user...");
  console.log(
    "To create custom admin, run: ts-node scripts/createAdmin.ts 'Name' 'email@domain.com' 'password'"
  );
  createAdminUser(defaultAdminData);
}
