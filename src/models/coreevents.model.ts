import { model, Schema } from "mongoose";

enum CoreEventIds {
  ONLINE_PUJA = "coreevent_online_puja",
  OFFLINE_PUJA = "coreevent_offline_puja",
}

//core
interface CoreEvent {
  name: string;
  description?: string;
  status: "active" | "inactive";
  iconUrl?: string;
  id: CoreEventIds;
}

const coreEventSchema = new Schema(
  {
    id: {
      type: String,
      enum: Object.values(CoreEventIds),
      required: true,
      unique: true,
      index: true,
    },
    name: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: false },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
    iconUrl: { type: String, required: false },
  },
  { timestamps: true }
);

const CoreEventModel = model<CoreEvent>("coreevent", coreEventSchema);
CoreEventModel.createIndexes();
export default CoreEventModel;
