import mongoose, { Schema, model, Document } from "mongoose";

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

export interface IPrasadDelivery {
  included: boolean;
  deliveryTime: string;
  prasadCharge: number;
}

export interface IPandit {
  name: string;
  about: string;
}

export interface ITemple extends Document {
  name: string;
  location: string;
  image: string;
  packages: IPackage[];
  prasadDelivery: IPrasadDelivery;
  pandit: IPandit;
  extraInfo: any;
  createdAt: Date;
  updatedAt: Date;
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
    id: { type: String, required: true },
    name: { type: String, required: true },
    numberOfPerson: { type: Number, required: true, min: 1 },
    title: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    description: [packageDescriptionSchema],
    isPopular: { type: Boolean, default: false },
  },
  { _id: false }
);

const prasadDeliverySchema = new Schema(
  {
    included: { type: Boolean, required: true },
    deliveryTime: { type: String, required: true },
    prasadCharge: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const panditSchema = new Schema(
  {
    name: { type: String, required: true },
    about: { type: String, required: true },
  },
  { _id: false }
);

const templeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    location: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    packages: [packageSchema],
    prasadDelivery: prasadDeliverySchema,
    pandit: panditSchema,
    extraInfo: { type: Schema.Types.Mixed, default: {} },
    description: [String],
  },
  { timestamps: true }
);

const TempleModel = mongoose.model<ITemple>("temples", templeSchema);
TempleModel.createIndexes();

export default TempleModel;
