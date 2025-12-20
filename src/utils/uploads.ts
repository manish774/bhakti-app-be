import multer from "multer";
import path from "path";
import fs from "fs";
import { Request, Response, NextFunction } from "express";

const UPLOAD_BASE_DIR = path.join(__dirname, "../../uploads/images");

// Ensure upload directory exists
export function ensureUploadDirectory() {
  if (!fs.existsSync(UPLOAD_BASE_DIR)) {
    fs.mkdirSync(UPLOAD_BASE_DIR, { recursive: true });
  }
}

// Multer storage configuration
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

// Image file filter
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

// Create multer upload instance
export const upload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Multer error handler middleware
export const handleMulterError = (err: any, req: Request, res: Response) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File size exceeds 5MB limit" });
    }
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(400).json({ message: err.message || "Upload failed" });
  }
};

// Generate file URL
export function generateFileUrl(req: Request, filename: string): string {
  return `${req.protocol}://${req.get("host")}/uploads/images/${filename}`;
}

// Generate multiple file URLs
export function generateFileUrls(
  req: Request,
  files: Express.Multer.File[]
): Array<Express.Multer.File & { url: string }> {
  const host = `${req.protocol}://${req.get("host")}`;
  return files.map((f) => ({
    ...f,
    url: `${host}/uploads/images/${f.filename}`,
  }));
}

// Delete file from uploads directory
export async function deleteFile(filename: string): Promise<boolean> {
  try {
    const filePath = path.join(UPLOAD_BASE_DIR, filename);

    // Check if file exists
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
}

// Delete multiple files from uploads directory
export async function deleteFiles(filenames: string[]): Promise<{
  deleted: string[];
  failed: string[];
}> {
  const deleted: string[] = [];
  const failed: string[] = [];

  for (const filename of filenames) {
    const success = await deleteFile(filename);
    if (success) {
      deleted.push(filename);
    } else {
      failed.push(filename);
    }
  }

  return { deleted, failed };
}
