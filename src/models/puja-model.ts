import mongoose, { Schema, model, Document } from "mongoose";

export interface IPujaDescription {
  description: string;
}

export interface IBenefit {
  name: string;
  benifit: string;
}

export interface IPujaMetadata {
  lastDate: string;
  description: string;
  pujaName: string;
  metadata: string;
}

export interface IPuja extends Document {
  coreId: string;
  className: string;
  name: string;
  startPrice: number;
  description: IPujaDescription[];
  pujaDescription: IPujaMetadata;
  benefits: IBenefit[];
  templeId: mongoose.Types.ObjectId;
  metaData: any;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const pujaDescriptionSchema = new Schema(
  {
    description: { type: String, required: true },
  },
  { _id: false }
);

const benefitSchema = new Schema(
  {
    name: { type: String, required: true },
    benifit: { type: String, required: true },
  },
  { _id: false }
);

const pujaMetadataSchema = new Schema(
  {
    lastDate: { type: String, required: true },
    description: { type: String, default: "" },
    pujaName: { type: String, required: true },
    metadata: { type: String, default: "" },
  },
  { _id: false }
);

const pujaSchema = new Schema(
  {
    coreId: { type: String, required: true, unique: true, index: true },
    className: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true, index: true },
    startPrice: { type: Number, required: true, min: 0 },
    description: [pujaDescriptionSchema],
    pujaDescription: pujaMetadataSchema,
    benefits: [benefitSchema],
    templeId: {
      type: Schema.Types.ObjectId,
      ref: "temples",
      required: true,
      index: true,
    },
    metaData: { type: Schema.Types.Mixed, default: {} },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

const PujaModel = mongoose.model<IPuja>("pujas", pujaSchema);
PujaModel.createIndexes();

export default PujaModel;
