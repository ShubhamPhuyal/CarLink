// models/CarRentalBooking.js
import { model, models, Schema } from "mongoose";

const CarRentalBookingSchema = new Schema({
  carId: { type: Schema.Types.ObjectId, required: true },
  carName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
}, {
  timestamps: true,
});

export const CarRentalBooking = models?.CarRentalBooking || model("CarRentalBooking", CarRentalBookingSchema);