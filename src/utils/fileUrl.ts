import { Request } from "express";

export const getFileUrl = (req: Request, filename: string) => {
  return `${req.protocol}://${req.get("host")}/uploads/images/${filename}`;
};
