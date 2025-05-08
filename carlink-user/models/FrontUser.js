import mongoose from "mongoose";

const FrontUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  online: { type: Boolean, default: false }, 
}, { timestamps: true });

const FrontUser = mongoose.models.FrontUser || mongoose.model("FrontUser", FrontUserSchema);

export default FrontUser;