import { ErrorRequestHandler } from "express";
import multer from "multer";

export const multerErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  next
): void => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({ message: "File size exceeds 5MB limit" });
      return;
    }
    res.status(400).json({ message: err.message });
    return;
  }

  if (err) {
    res.status(400).json({ message: err.message || "Upload failed" });
    return;
  }

  next(err);
};
