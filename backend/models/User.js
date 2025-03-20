import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"], // Define the roles you want here
      default: "user", // Default role is user, admin can be assigned later
    },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
    // Reference to bookings
    refreshToken: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
