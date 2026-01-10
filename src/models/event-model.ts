import mongoose, { Schema } from "mongoose";

export type PackageIddec = {
  packageId: string;
  price: number;
  discount: number;
};

export type Ievent = {
  coreEventId?: string;
  eventName: string;
  templeId: string[];
  packageId: string[];
  pricePackageId: PackageIddec[];
  eventExpirationTime: string;
  eventStartTime: string;
  isPopular: boolean;
};

const pricePackageSchema = new Schema(
  {
    packageId: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
  },
  { _id: false }
);

const packageSchema = new Schema(
  {
    coreEventId: { type: String, required: true },
    eventName: { type: String, required: true },
    templeId: { type: [String], required: true },
    packageId: { type: [String], default: true },
    pricePackageId: { type: [pricePackageSchema], required: true },
    eventExpirationTime: { type: String, default: null, required: true },
    eventStartTime: { type: String, default: null, required: true },
    isPopular: { type: Boolean, default: false },
  },
  { _id: true }
);

const EventModel = mongoose.model<Ievent>("events", packageSchema);
EventModel.createIndexes();
export default EventModel;
