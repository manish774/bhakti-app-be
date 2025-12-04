import { Router, Request, Response } from "express";
import { userAllowedProps } from "../utils/allowedPropsToUpdate";
import { componentValidate } from "../utils/validate";
import UserModel from "../models/users";
import UserAuthModel from "../models/userAuth";
import { hash } from "bcrypt";
import { generateCode } from "../utils/common";
import { generateOtpEmailHtml } from "../email/templates";
import { EmailService } from "../email/email";
const router = Router();

router.post("/signup", async (req: Request, res: Response): Promise<any> => {
  try {
    if (!userAllowedProps.create.isValid({ data: Object.keys(req.body) })) {
      return res.status(400).json(userAllowedProps.create.error);
    }
    componentValidate({ validateFor: "signup", values: req.body });
    const hashedPassword = await hash(req.body.password, 10);
    const userInput = req.body;
    const user = new UserModel(userInput);
    const userResp = await user.save();
    const otp = generateCode(6);
    const userAuth = new UserAuthModel({
      emailOrPhone: userResp.email,
      password: hashedPassword,
      id: user._id,
      isVerified: false,
      verificationCode: otp,
    });
    await userAuth
      .save()
      .then((data) => {
        res.json(req.body);
      })
      .then((res) => {
        const otpTemplate = generateOtpEmailHtml(otp);
        const email = EmailService.getInstance();
        email.sendMail({
          to: userResp.email,
          subject: "OTP for verification",
          text: "no",
          html: otpTemplate,
        });
      })
      .catch(async (error: any) => {
        console.log(error, "..");

        await UserModel.findByIdAndDelete(userResp._id);
        res.status(400).send(error);
      });
  } catch (e) {
    if (e.code === 11000) {
      console.log(e, "i00000");
      return res.status(400).json(
        JSON.stringify({
          field: Object.keys(e.errorResponse?.keyPattern)[0],
          message: `${
            Object.keys(e.errorResponse?.keyPattern)[0]
          } already exists`,
        })
      );
    }
    res.status(400).json(e?.message);
  }
});

router.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await UserAuthModel.findOne({ emailOrPhone: req.body.email });
    if (user?.isVerified === false) {
      return res.status(400).json("VERIFY_EMAIL");
    }
    if (user) {
      const validatePassword = await user.isPasswordSame(req.body.password);
      if (validatePassword) {
        const token = await user.getJWT();
        // res.cookie("token", token);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true, // required for HTTPS
          sameSite: "none", // allows cross-site cookies
        });
        const userdetail = await UserModel.findOne({ email: req.body.email });
        res.json({ userdetail, token });
      } else {
        res.status(400).json("Password is incorrect");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (e) {
    res.status(400).json(e?.message);
  }
});

router.get("/logout", async (req: Request, res: Response) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .json("Logged out");
});

router.post("/resendOtp", async (req: Request, res: Response): Promise<any> => {
  try {
    const userAuth = await UserAuthModel.findOne({
      emailOrPhone: req.body.email,
    });

    if (!userAuth) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (userAuth.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "User already verified" });
    }

    const otp = generateCode(6);
    await UserAuthModel.updateOne(
      { emailOrPhone: userAuth.emailOrPhone },
      { $set: { verificationCode: otp } }
    );

    const otpTemplate = generateOtpEmailHtml(otp);
    const email = EmailService.getInstance();
    email.sendMail({
      to: userAuth.emailOrPhone,
      subject: "OTP for verification",
      text: "no",
      html: otpTemplate,
    });

    return res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (e: any) {
    console.error(e);
    return res
      .status(500)
      .json({ success: false, message: e?.message || "Server error" });
  }
});

router.post(
  "/verify-otp",
  async (req: Request, res: Response): Promise<any> => {
    console.log("calling");
    try {
      const userAuth = await UserAuthModel.findOne({
        emailOrPhone: req.body.email,
      });

      if (!userAuth) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      if (userAuth.isVerified) {
        return res
          .status(400)
          .json({ success: false, message: "User already verified" });
      }

      if (userAuth.verificationCode?.toString() !== req.body.otp) {
        console.log("first");
        return res.status(400).json({ success: false, message: "Invalid OTP" });
      }

      // ✅ OTP matched → update
      await UserAuthModel.updateOne(
        { emailOrPhone: userAuth.emailOrPhone },
        { $set: { isVerified: true } }
      );

      return res.json({
        success: true,
        message: "Email verified successfully",
      });
    } catch (e: any) {
      console.error(e);
      return res
        .status(500)
        .json({ success: false, message: e?.message || "Server error" });
    }
  }
);

export default router;
