import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bus: { type: Schema.Types.ObjectId, ref: 'Bus', required: true },
  seats: { type: [Number], required: true },
  totalAmount: { type: Number, required: true },
  paymentId: { type: String, required: true },
  paymentStatus: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default model('Bookings', bookingSchema);