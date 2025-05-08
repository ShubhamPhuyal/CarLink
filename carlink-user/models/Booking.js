// models/Booking.js
import { model, models, Schema } from "mongoose";

const BookingSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, required: true },
  productName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
}, {
  timestamps: true,
});

export const Booking = models?.Booking || model('Booking', BookingSchema);