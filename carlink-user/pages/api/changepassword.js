import { mongooseConnect } from "@/lib/mongoose";
import FrontUser from "@/models/FrontUser"; // Import FrontUser schema
import User from "@/models/User"; // Import User schema
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await mongooseConnect();

    const { email, currentPassword, newPassword } = req.body;

    try {
      // Check both FrontUser and User collections
      let user = await FrontUser.findOne({ email });
      let userModel = FrontUser;

      if (!user) {
        user = await User.findOne({ email });
        userModel = User;
      }

      // If user is not found in either collection
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Verify the current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Current password is incorrect." });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      await userModel.updateOne({ email }, { password: hashedPassword });

      res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Failed to change password." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}