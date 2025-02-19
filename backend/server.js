const express = require("express");

const mongoose = require("mongoose");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobPostRoutes");
const applicationRoutes = require("./routes/applicationRoutes");


const path = require("path");

const multer = require("multer");

const bodyParser = require("body-parser");


dotenv.config();

// middleware
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

app.use(express.json());

//console.log(path.join(__dirname, "uploads", "1739765419618.jpg"));




app.use("/uploads", express.static("uploads"));
app.use("/uploads/resumes", express.static("uploads/resumes"));
app.use("/uploads/profile-images", express.static("uploads/profile-images"));

//routes
//user routes
app.use("/api/users", userRoutes);

//job post routes
app.use("/api/recruiter", jobRoutes);

//applicaiton routes
app.use("/api/applicant", applicationRoutes);

// mongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

connectDB();

//error handling middleware

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});




const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
