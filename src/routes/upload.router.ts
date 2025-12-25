import { Router, Request, Response } from "express";
import { upload } from "../middleware/uploads";
import { multerErrorHandler } from "../middleware/multerError";
import { getFileUrl } from "../utils/fileUrl";

const router = Router();

// Single image
router.post(
  "/single",
  upload.single("image"),
  (req: Request, res: Response): void => {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    res.json({
      message: "File uploaded",
      file: {
        ...req.file,
        url: getFileUrl(req, req.file.filename),
      },
    });
  },
  multerErrorHandler
);

// Multiple images
router.post(
  "/multiple",
  upload.array("images", 10),
  (req: Request, res: Response): void => {
    const files = req.files as Express.Multer.File[];

    if (!files?.length) {
      res.status(400).json({ message: "No files uploaded" });
      return;
    }

    res.json({
      message: "Files uploaded",
      files: files.map((f) => ({
        ...f,
        url: getFileUrl(req, f.filename),
      })),
    });
  },
  multerErrorHandler
);

export default router;
