import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
  userType: { type: String, enum: ["donor", "receiver"], required: true },
  recipientType: { type: String, enum: ["orphanage", "shelter", "ngo", "poultry farming"], required: function () { return this.userType === "receiver"; } }
});

const User = mongoose.model("User", userSchema);
export default User;