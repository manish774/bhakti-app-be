import { model, Schema } from "mongoose";

//core
interface CoreEvent {
  name: string;
  description?: string;
  status: "active" | "inactive";
  iconUrl?: string;
}

const coreEventSchema = new Schema(
  {
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
