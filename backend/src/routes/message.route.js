// Import Express framework for creating web server and routing
import express from "express";

// Import authentication middleware to protect routes from unauthorized access
import { protectRoute } from "../middleware/auth.middleware.js";

// Import controller functions that handle the business logic for message operations
import {
  getMessages, // Function to retrieve messages between users
  getUsersForSidebar, // Function to get list of users for chat sidebar
  sendMessage, // Function to send a new message
} from "../controllers/message.controller.js";

// Create a new Express router instance to define route handlers
const router = express.Router();

// GET route to fetch all users for the chat sidebar
// Protected route - requires user authentication
// Endpoint: GET /users
router.get("/users", protectRoute, getUsersForSidebar);

// GET route to retrieve messages for a specific conversation
// Protected route - requires user authentication
// Endpoint: GET /:id (where :id is the user ID of the chat partner)
router.get("/:id", protectRoute, getMessages);

// POST route to send a new message
// Protected route - requires user authentication
// Endpoint: POST /send
router.post("/send", protectRoute, sendMessage);

// Export the router to be used in the main application
export default router;
