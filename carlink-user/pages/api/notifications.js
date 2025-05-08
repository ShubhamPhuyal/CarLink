// pages/api/notifications.js
import { getToken } from "next-auth/jwt";
import { mongooseConnect } from "@/lib/mongoose";
import { Booking } from "@/models/Booking";
import { CarRentalBooking } from "@/models/CarRentalBooking";
import { Order } from "@/models/Order";
import FrontUser from "@/models/FrontUser";
import User from "@/models/User";

export default async function handler(req, res) {
  try {
    await mongooseConnect();
    
    // Verify the JWT token
    const token = await getToken({ 
      req, 
      secret: process.env.SECRET  // Use the same secret as in your NextAuth config
    });
    
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - Please log in" });
    }

    // Get the user's ID and email from the token
    const userId = token.id;
    const userEmail = token.email;
    const userRole = token.role;
    
    if (!userEmail) {
      return res.status(401).json({ error: "Invalid user session" });
    }

    // Find the user to verify they exist (check both models based on role)
    let user;
    if (userRole === "admin") {
      user = await User.findById(userId);
    } else {
      user = await FrontUser.findById(userId);
    }
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.method === 'GET') {
      try {
        // Get only notifications relevant to the current user by email
        const [orders, bookings, rentals] = await Promise.all([
          Order.find({ email: userEmail }).sort({ createdAt: -1 }).limit(5),
          Booking.find({ email: userEmail }).sort({ createdAt: -1 }).limit(5),
          CarRentalBooking.find({ email: userEmail }).sort({ createdAt: -1 }).limit(5)
        ]);

        // Format notifications
        const notifications = [
          ...orders.map(order => ({
            type: 'order',
            id: order._id.toString(),
            message: `Your order #${order._id.toString().slice(-6)} is ${order.status}`,
            createdAt: order.createdAt,
            read: false
          })),
          ...bookings.map(booking => ({
            type: 'booking',
            id: booking._id.toString(),
            message: `Your booking for ${booking.productName || 'item'} is ${booking.status}`,
            createdAt: booking.createdAt,
            read: false
          })),
          ...rentals.map(rental => ({
            type: 'rental',
            id: rental._id.toString(),
            message: `Your rental for ${rental.carName || 'car'} is ${rental.status}`,
            createdAt: rental.createdAt,
            read: false
          }))
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
         .slice(0, 10);

        console.log(`Found ${notifications.length} notifications for user ${userEmail}`);
        res.status(200).json(notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: "Error fetching notifications" });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
}