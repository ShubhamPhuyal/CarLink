import User from "@/models/User";
import FrontUser from "@/models/FrontUser";
import { mongooseConnect } from "@/lib/mongoose";
import { promises as fs } from "fs";
import path from "path";
import multer from "multer";

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(), "public/uploads")); // Save files in the "public/uploads" folder
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname); // Generate a unique filename
    },
  }),
});

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser to use multer
  },
};

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "POST") {
    // Use multer to handle the file upload
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: "File upload failed" });
      }

      const { email } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      try {
        // Construct the file URL
        const fileUrl = `/uploads/${file.filename}`;

        // Update the user's profile image in the database
        let user = await FrontUser.findOneAndUpdate(
          { email },
          { image: fileUrl },
          { new: true }
        );

        // If not found in FrontUser, check User schema (Admin)
        if (!user) {
          user = await User.findOneAndUpdate(
            { email },
            { image: fileUrl },
            { new: true }
          );
        }

        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Error updating profile" });
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}