import mongoose from 'mongoose';

const mechanicSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, required: true },
  aadharPic: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
}, { timestamps: true });

const Mechanic = mongoose.model("Mechanic", mechanicSchema);
export default Mechanic;
