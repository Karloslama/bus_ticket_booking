import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  number: { type: String, required: true }, // Add bus number
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureDate: { type: String, required: true }, // Add departure date
  departureTime: { type: String, required: true }, // Add departure time
  fare: { type: Number, required: true }, // Add fare
  capacity: { type: Number, required: true }, // Add capacity
  seatsBooked: { type: [String], default: [] }, // Store booked seats as an array of strings
});

export default mongoose.model("Bus", busSchema);
