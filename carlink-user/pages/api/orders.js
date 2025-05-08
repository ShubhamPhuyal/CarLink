// api/orders.js
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "GET") {
    try {
      const { email, id } = req.query;

      if (id) {
        // Fetch single order by ID
        const order = await Order.findById(id);
        return res.json(order);
      } else if (email) {
        // Fetch orders for specific user
        const orders = await Order.find({ email }).sort({ createdAt: -1 });
        return res.json(orders);
      } else {
        // Fetch all orders (admin)
        const orders = await Order.find().sort({ createdAt: -1 });
        return res.json(orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const { status } = req.body;

      if (!id || !status) {
        return res.status(400).json({ message: "Order ID and status are required" });
      }

      const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }

      const order = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json(order);
    } catch (error) {
      console.error("Error updating order status:", error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "PATCH"]);
  return res.status(405).json({ message: `Method ${req.method} not allowed` });
}