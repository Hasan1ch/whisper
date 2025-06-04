// backend/src/index.js

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js"; // Your database connection utility
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"; // Node.js built-in path module
import { fileURLToPath } from "url"; // To get __dirname in ES modules

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

// Helper to get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Middleware ---

// CORS configuration: Allows your frontend (http://localhost:5173) to make requests
app.use(
  cors({
    origin: "http://localhost:5173", // Your React app's development URL
    credentials: true, // Important for sending cookies/auth headers
  })
);

// JSON body parser: Parses incoming JSON requests.
// Added 'limit' to handle larger Base64 image strings.
app.use(express.json({ limit: "50mb" }));

// Cookie parser: Parses cookies attached to the request
app.use(cookieParser());

// Serve static files (e.g., uploaded images if you ever store them locally, or other static assets)
// Even though you're using Cloudinary, this is good practice for general static content.
// Make sure the 'uploads' directory exists in your backend root if you use this.
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // Adjusted path if 'uploads' is parallel to 'src'

// --- API Routes ---
app.use("/api/auth", authRoutes); // All auth-related routes are prefixed with /api/auth
app.use("/api/message", messageRoutes);

// --- Server Start ---
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
  connectDB(); // Connect to your MongoDB database
});
