import mongoose, { Schema } from "mongoose";

type Ievent = {
  eventName: string;
  templeId: string[];
  packageId: string[];
  pricePackageId: Record<string, any>;
  eventExpirationTime: string;
  eventStartTime: string;
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
    eventName: { type: String, required: true },
    templeId: { type: [String], required: true },
    packageId: { type: [String], default: true },
    pricePackageId: { type: [pricePackageSchema], required: true },

    isPopular: { type: Boolean, default: false },
  },
  { _id: true }
);

const EventModel = mongoose.model<Ievent>("events", packageSchema);
EventModel.createIndexes();
export default EventModel;
