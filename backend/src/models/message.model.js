// Import text utility from Express (though not used in this file)
import { text } from "express";
// Import Mongoose library for MongoDB object modeling
import mongoose from "mongoose";

// Define the message schema structure for MongoDB documents
// This schema represents individual chat messages between users
const messageSchema = new mongoose.Schema(
  {
    // ID of the user who sent this message
    senderID: {
      type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId type
      ref: "User", // References the User model (establishes relationship)
      required: true, // Field is mandatory - every message must have a sender
    },

    // ID of the user who will receive this message
    receiverID: {
      type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId type
      ref: "User", // References the User model (establishes relationship)
      required: true, // Field is mandatory - every message must have a receiver
    },

    // The actual text content of the message
    text: {
      type: String, // Data type: string
      required: true, // Field is mandatory - message must have text content
    },

    // Optional image attachment for the message
    image: {
      type: String, // Data type: string (stores URL or file path)
      default: null, // Default to null if no image attached
    },
  },
  // Schema options
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
  }
);

// Create the Message model from the schema
// This model provides an interface for CRUD operations on message documents
const Message = mongoose.model("Message", messageSchema);

// Export the Message model to be used in other parts of the application
export default Message;
