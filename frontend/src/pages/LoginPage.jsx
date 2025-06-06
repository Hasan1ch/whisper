/**
 * LoginPage Component
 *
 * User authentication login page with modern UI design
 * Features a two-column layout with form on left and decorative pattern on right
 *
 * Key Features:
 * - Email and password authentication
 * - Password visibility toggle
 * - Loading states during authentication
 * - Responsive design (stacks on mobile)
 * - Integration with Zustand auth store
 * - Form validation and error handling
 *
 * @component
 * @author Hassan Abdukadirov
 */

import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  // Local state for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Form data state - controlled inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Extract login function and loading state from auth store
  const { login, isLoggingIn } = useAuthStore();

  /**
   * Handles form submission
   * Prevents default form behavior and calls login function from store
   *
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    login(formData); // Call login with form data (email, password)
  };

  return (
    // Main container with full height and responsive grid layout
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Login Form Section */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        {/* Form container with max width and spacing */}
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Header Section */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              {/* App logo with hover animation */}
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>

              {/* Welcome text */}
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                {/* Mail icon positioned inside input */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
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
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>

                {/* Password input with dynamic type based on visibility state */}
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  className={`input input-bordered w-full pl-10`}
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
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button with Loading State */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn} // Disable during login process
            >
              {/* Conditional rendering based on loading state */}
              {isLoggingIn ? (
                // Loading state with spinner and text
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                // Default state
                "Sign in"
              )}
            </button>
          </form>

          {/* Sign Up Link Section */}
          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account? {/* Navigation link to signup page */}
              <Link to="/signup" className="link link-primary">
                Create account
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
        title={"Welcome back!"}
        subtitle={
          "Sign in to continue your conversations and catch up with your messages."
        }
      />
    </div>
  );
};

export default LoginPage;
