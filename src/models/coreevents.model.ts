import { model, Schema } from "mongoose";

export enum CoreEventIds {
  ONLINE_PUJA = "coreevent_online_puja",
  OFFLINE_PUJA = "coreevent_offline_puja",
}

// core event type
export interface CoreEvent {
  type: CoreEventIds;
  title: string;
  description?: string;
  icon: string;
  color: string;
  shadowColor: string;
  visible: boolean;
}

const coreEventSchema = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(CoreEventIds),
      required: true,
      unique: true,
      index: true,
    },
    title: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: false },
    icon: { type: String, required: true },
    color: { type: String, required: false },
    shadowColor: { type: String, required: false },
    visible: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

const CoreEventModel = model<CoreEvent>("coreevent", coreEventSchema);
CoreEventModel.createIndexes();
export default CoreEventModel;
