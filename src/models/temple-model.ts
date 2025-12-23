import mongoose, { Schema, model, Document } from "mongoose";

export interface IPrasadDelivery {
  included: boolean;
  deliveryTime: string;
  prasadCharge: number;
}

export interface ITemple extends Document {
  name: string;
  location: string;
  image?: string;
  extraInfo: any;
  createdAt: Date;
  updatedAt: Date;
}

const prasadDeliverySchema = new Schema(
  {
    included: { type: Boolean, required: true },
    deliveryTime: { type: String, required: true },
    prasadCharge: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const templeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    location: { type: String, required: true, trim: true },
    image: { type: String, required: false },
    // packages: [packageSchema],
    // prasadDelivery: prasadDeliverySchema,
    // pandit: panditSchema,
    extraInfo: { type: Schema.Types.Mixed, default: {} },
    description: [String],
  },
  { timestamps: true }
);

const TempleModel = mongoose.model<ITemple>("temples", templeSchema);
TempleModel.createIndexes();

export default TempleModel;
