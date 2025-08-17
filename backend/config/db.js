import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI;
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

export default connectDB;


lo