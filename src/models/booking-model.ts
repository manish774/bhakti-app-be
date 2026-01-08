import mongoose, { Schema, Document } from "mongoose";

export interface IBookingDevotee {
  name: string;
  gotra?: string;
  phoneNumber?: string;
  email?: string;
}

export interface IBooking extends Document {
  coreType: string;
  eventId: string;
  userId: mongoose.Types.ObjectId;
  pujaId: mongoose.Types.ObjectId;
  templeId: mongoose.Types.ObjectId;
  packageId: string;
  devotees: IBookingDevotee[];
  totalAmount: number;
  prasadIncluded: boolean;
  prasadCharge: number;
  bookingDate: Date;
  pujaDate: Date;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentId?: string;
  videoUrl?: string;
  videoUploadedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const devoteeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    gotra: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
  },
  { _id: false }
);

const bookingSchema = new Schema(
  {
    coreType: { type: String, required: true, index: true },

    eventId: { type: String, required: true },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },

    pujaId: {
      type: Schema.Types.ObjectId,
      ref: "pujas",
      required: true,
      index: true,
    },

    templeId: {
      type: Schema.Types.ObjectId,
      ref: "temples",
      required: true,
      index: true,
    },

    packageId: { type: String, required: true },

    devotees: [devoteeSchema],

    totalAmount: { type: Number, required: true, min: 0 },

    prasadIncluded: { type: Boolean, default: false },

    prasadCharge: { type: Number, default: 0, min: 0 },

    bookingDate: { type: Date, default: Date.now, index: true },

    pujaDate: { type: Date, required: true, index: true },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
      index: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
      index: true,
    },

    paymentId: { type: String, sparse: true },

    videoUrl: { type: String },

    videoUploadedAt: { type: Date },

    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

bookingSchema.index({ userId: 1, status: 1 });
bookingSchema.index({ pujaDate: 1, status: 1 });
bookingSchema.index({ templeId: 1, pujaDate: 1 });

const BookingModel = mongoose.model<IBooking>("bookings", bookingSchema);
BookingModel.createIndexes();

export default BookingModel;
