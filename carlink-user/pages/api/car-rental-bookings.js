// api/car-rental-bookings.js
import { mongooseConnect } from "../../lib/mongoose";
import { CarRentalBooking } from "../../models/CarRentalBooking";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "POST") {
    try {
      const { carId, carName, name, email, phone, address, startDate, endDate } = req.body;

      if (!carId || !carName || !name || !email || !phone || !address || !startDate || !endDate) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const booking = await CarRentalBooking.create({
        carId,
        carName,
        name,
        email,
        phone,
        address,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: 'pending'
      });

      return res.status(201).json(booking);
    } catch (error) {
      console.error("Car Rental Booking Error:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  if (req.method === "GET") {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const bookings = await CarRentalBooking.find({ email }).sort({ createdAt: -1 });
      return res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching car rental bookings:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const { status } = req.body;

      if (!id || !status) {
        return res.status(400).json({ message: "Booking ID and status are required" });
      }

      const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }

      const booking = await CarRentalBooking.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      return res.status(200).json(booking);
    } catch (error) {
      console.error("Error updating car rental booking:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  res.setHeader("Allow", ["POST", "GET", "PATCH"]);
  return res.status(405).json({ message: `Method ${req.method} not allowed` });
}