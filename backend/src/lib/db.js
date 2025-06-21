/**
 * Database Connection Module
 *
 * Handles MongoDB connection using Mongoose ODM (Object Document Mapper)
 * Establishes connection to MongoDB Atlas cloud database for the Whisper chat application
 *
 * Features:
 * - Async connection with error handling
 * - Environment variable configuration for security
 * - Connection status logging for debugging
 * - Graceful error handling with process termination
 * - Legacy option compatibility for older MongoDB drivers
 *
 * @module Database Connection
 * @author Hassan Abdukadirov
 */

// Import Mongoose library for MongoDB object modeling and connection
import mongoose from "mongoose";

/**
 * Establishes connection to MongoDB database
 *
 * Uses environment variables for secure database URI storage
 * Includes connection options for compatibility and stability
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>} Resolves when connection is successful
 * @throws {Error} Terminates process if connection fails
 */
export const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using connection string from environment variables
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Legacy parser option for compatibility with older MongoDB versions
      // Note: These options are deprecated in newer MongoDB drivers but kept for stability
      useNewUrlParser: true, // Use new URL string parser instead of legacy parser
      useUnifiedTopology: true, // Use new Server Discovery and Monitoring engine
    });

    // Log successful connection with host information for debugging
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log detailed error information if connection fails
    console.error(`Error: ${error.message}`);

    // Terminate the Node.js process with error code 1
    // This prevents the application from running without database connection
    process.exit(1);
  }
};
