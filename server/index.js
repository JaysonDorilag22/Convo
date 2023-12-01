import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import userRouter from "./routes/user.route.js"
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));
app.use(cookieParser());
app.use(express.json());

app.get("/test", (req, res) => {
  res.json("test ok");
});

// Connect to MongoDB using the connection string from environment variables
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(4000, () => {
  console.log("Server is running on port 4000!");
});

app.use('/api/user', userRouter);


// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
