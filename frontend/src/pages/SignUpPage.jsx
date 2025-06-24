/**
 * SignUpPage Component
 *
 * User registration page with comprehensive form validation and modern UI design
 * Features a two-column layout with registration form on left and decorative pattern on right
 *
 * Key Features:
 * - Form validation for all required fields
 * - Password visibility toggle functionality
 * - Real-time form state management
 * - Loading states during registration process
 * - Email format validation with regex
 * - Responsive design (stacks on mobile)
 * - Integration with Zustand auth store
 * - Toast notifications for user feedback
 *
 * @component
 * @author Hassan Abdukadirov
 */

// Import icons from Lucide React for form elements and UI
import {
  Eye, // Show password icon
  EyeOff, // Hide password icon
  Loader2, // Loading spinner
  Lock, // Password field icon
  Mail, // Email field icon
  MessageSquare, // App logo icon
  User, // Name field icon
} from "lucide-react";
// Import React hooks for state management
import { useState } from "react";
// Import authentication store for signup functionality
import { useAuthStore } from "../store/useAuthStore.js";
import React from "react";
// Import routing components
import { Link } from "react-router-dom";
// Import decorative pattern component
import AuthImagePattern from "../components/AuthImagePattern.jsx";
// Import toast notifications for user feedback
import toast from "react-hot-toast";

const SignUpPage = () => {
  // Local state for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Form data state - controlled inputs for all form fields
  const [formData, setFormData] = useState({
    fullName: "", // User's full name
    email: "", // User's email address
    password: "", // User's password
  });

  // Extract signup function and loading state from auth store
  const { signup, isSigningUp } = useAuthStore();

  /**
   * Validates form data before submission
   * Checks for required fields, email format, and password length
   *
   * @returns {boolean|void} Returns true if valid, or shows error toast and returns void
   */
  const validateForm = () => {
    // Check if full name is provided and not just whitespace
    if (!formData.fullName.trim()) {
      return toast.error("Full Name is required");
    }

    // Check if email is provided and not just whitespace
    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }

    // Validate email format using regex pattern
    // Pattern checks for: characters@characters.characters
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return toast.error("Invalid email format");
    }

    // Check if password is provided and not just whitespace
    if (!formData.password.trim()) {
      return toast.error("Password is required");
    }

    // Ensure password meets minimum length requirement
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    return true; // All validations passed
  };

  /**
   * Handles form submission
   * Prevents default form behavior, validates data, and calls signup if valid
   *
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Validate form data before proceeding
    const success = validateForm();
    if (success === true) {
      // Call signup function from auth store with form data
      signup(formData);
    }
  };

  return (
    // Main container with full height and responsive grid layout
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Registration Form Section */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        {/* Form container with max width and spacing */}
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Header Section */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              {/* App logo with hover animation */}
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>

              {/* Welcome text */}
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                {/* User icon positioned inside input */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>

                {/* Full name input with left padding for icon */}
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    // Update fullName in form state while preserving other fields
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email Input Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                {/* Mail icon positioned inside input */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>

                {/* Email input with left padding for icon */}
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    // Update email in form state while preserving other fields
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Input Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                {/* Lock icon positioned inside input */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>

                {/* Password input with dynamic type based on visibility state */}
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  className="input input-bordered w-full pl-10 pr-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    // Update password in form state while preserving other fields
                    setFormData({ ...formData, password: e.target.value })
                  }
                />

                {/* Password visibility toggle button */}
                <button
                  type="button" // Prevent form submission when clicked
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)} // Toggle visibility state
                >
                  {/* Show appropriate icon based on current visibility state */}
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button with Loading State */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp} // Disable during signup process
            >
              {/* Conditional rendering based on loading state */}
              {isSigningUp ? (
                // Loading state with spinner and text
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                // Default state
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link Section */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account? {/* Navigation link to login page */}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Decorative Pattern/Image */}
      {/* 
        AuthImagePattern component displays decorative content
        Only visible on large screens (lg:grid-cols-2)
        Hidden on mobile for better UX
      */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;
