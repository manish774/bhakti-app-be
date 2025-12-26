import { Router, Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

const UPLOAD_BASE_DIR = path.join(__dirname, "../../uploads/images");

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_BASE_DIR)) {
  fs.mkdirSync(UPLOAD_BASE_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_BASE_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

function imageFileFilter(
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
}

const upload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Multer error handler wrapper
const handleMulterError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File size exceeds 5MB limit" });
    }
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(400).json({ message: err.message || "Upload failed" });
  }
  next();
};

// Single image
router.post(
  "/single",
  (req: Request, res: Response, next: NextFunction) => {
    upload.single("image")(req, res, (err: any) => {
      if (err) {
        return handleMulterError(err, req, res, next);
      }
      next();
    });
  },
  (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }
    const url = `${req.protocol}://${req.get("host")}/uploads/images/${
      req.file.filename
    }`;
    res.json({ message: "File uploaded", file: { ...req.file, url } });
  }
);

// Multiple images
router.post(
  "/multiple",
  (req: Request, res: Response, next: NextFunction) => {
    upload.array("images", 10)(req, res, (err: any) => {
      if (err) {
        return handleMulterError(err, req, res, next);
      }
      next();
    });
  },
  (req: Request, res: Response) => {
    const files = (req.files as Express.Multer.File[]) || [];
    if (!files.length) {
      res.status(400).json({ message: "No files uploaded" });
      return;
    }
    const host = `${req.protocol}://${req.get("host")}`;
    const result = files.map((f) => ({
      ...f,
      url: `${host}/uploads/images/${f.filename}`,
    }));
    res.json({ message: "Files uploaded", files: result });
  }
);

export default router;
