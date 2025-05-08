// pages/api/bookings.js
import { mongooseConnect } from "@/lib/mongoose";
import { Booking } from "@/models/Booking";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await mongooseConnect();
  
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
}