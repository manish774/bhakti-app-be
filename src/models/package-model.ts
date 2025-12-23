import mongoose, { Schema } from "mongoose";

export interface IPackageDescription {
  id: number;
  detail: string;
}

export interface IPackage {
  id: string;
  name: string;
  numberOfPerson: number;
  title: string;
  price: number;
  description: IPackageDescription[];
  isPopular: boolean;
}

const packageDescriptionSchema = new Schema(
  {
    id: { type: Number, required: true },
    detail: { type: String, required: true },
  },
  { _id: false }
);

const packageSchema = new Schema(
  {
    name: { type: String, required: true },
    numberOfPerson: { type: Number, required: true, min: 1 },
    title: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    description: [packageDescriptionSchema],
    isPopular: { type: Boolean, default: false },
  },
  { _id: true }
);

const PackageModel = mongoose.model<IPackage>("packages", packageSchema);
PackageModel.createIndexes();
export default PackageModel;
