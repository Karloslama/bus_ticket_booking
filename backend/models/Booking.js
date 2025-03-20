import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  busId: { type: Schema.Types.ObjectId, ref: "Bus", required: true },
  seats: { type: [String], required: true },
  totalAmount: { type: Number, required: true },
  paymentId: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default model("Bookings", bookingSchema);
