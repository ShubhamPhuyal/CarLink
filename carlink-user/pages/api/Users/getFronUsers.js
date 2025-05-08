import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/User";

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const admins = await User.find().select("_id name email");
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch admins" });
    }
}
