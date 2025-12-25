import mongoose, { Schema, Document } from "mongoose";

/* -------------------- Interfaces -------------------- */

export interface IPrasadDelivery {
  included: boolean;
  deliveryTime: string;
  prasadCharge: number;
}

export interface ILocation {
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
}

export interface ITemple extends Document {
  name: string;
  location: ILocation;
  image?: string;
  extraInfo: any;
  description: string[];
  createdAt: Date;
  updatedAt: Date;
}

/* -------------------- Sub Schemas -------------------- */

const prasadDeliverySchema = new Schema(
  {
    included: { type: Boolean, required: true },
    deliveryTime: { type: String, required: true },
    prasadCharge: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const locationSchema = new Schema(
  {
    addressLine1: { type: String, required: true, trim: true },
    addressLine2: { type: String, trim: true },
    landmark: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    pinCode: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{6}$/, "Invalid pin code"],
    },
  },
  { _id: false }
);

const contractorInfo = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: locationSchema, required: true },
});
/* -------------------- Main Schema -------------------- */

const templeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    location: {
      type: locationSchema,
      required: true,
    },

    image: {
      type: String,
    },

    extraInfo: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },

    contractorInfo: {
      type: contractorInfo,
      required: true,
    },
    images: { type: [String], required: true },

    description: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: "Description must have at least one item",
      },
    },
  },
  { timestamps: true }
);

/* -------------------- Model -------------------- */

const TempleModel = mongoose.model<ITemple>("temples", templeSchema);
TempleModel.createIndexes();

export default TempleModel;
