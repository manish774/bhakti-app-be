import mongoose, { Schema } from "mongoose";

export interface IPandit {
  name: string;
  about: string;
  address: string;
  email?: string;
  phone: string;
  extraInfo?: string;
  specialization: string[];
  templeAssociatedId: string[];
}

const panditSchema = new Schema(
  {
    name: { type: String, required: true },
    about: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: true },
    extraInfo: { type: String, required: false },
    specialization: { type: [String], required: true },
    templeAssociatedId: { type: [String], required: true },
  },
  { _id: true }
);

const PanditModel = mongoose.model<IPandit>("pandits", panditSchema);
PanditModel.createIndexes();
export default PanditModel;
