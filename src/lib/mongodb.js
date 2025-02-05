import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URL environment variable is not set!");
}

export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
}
