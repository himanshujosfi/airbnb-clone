import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connection.js";
import authroute from "./routes/authroute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

// Enable CORS globally
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

// Routes
app.use("/api/auth", authroute);

app.listen(port, () => {
    connectDB();
    console.log(`Server running on port ${port}`);
});
