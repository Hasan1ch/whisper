// Import Mongoose library for MongoDB object modeling
import mongoose from "mongoose";

// Define the user schema structure for MongoDB documents
// This schema defines the shape and validation rules for user data
const userSchema = new mongoose.Schema(
  {
    // User's email address - used for authentication and identification
    email: {
      type: String, // Data type: string
      required: true, // Field is mandatory
      unique: true, // Must be unique across all users (no duplicates)
    },

    // User's full name for display purposes
    fullName: {
      type: String, // Data type: string
      required: true, // Field is mandatory
    },

    // User's password - will be hashed before storing in database
    password: {
      type: String, // Data type: string
      required: true, // Field is mandatory
      minlegth: 6, // Minimum length of 6 characters (Note: should be 'minlength')
    },

    // URL/path to user's profile picture
    profilePic: {
      type: String, // Data type: string (stores URL or file path)
      default: "", // Default to empty string if no profile picture uploaded
    },
  },
  // Schema options
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
  }
);

// Create the User model from the schema
// This model provides an interface for CRUD operations on user documents
const User = mongoose.model("User", userSchema);

// Export the User model to be used in other parts of the application
export default User;
