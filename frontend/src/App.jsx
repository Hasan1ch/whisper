/**
 * Main App Component - Root of the Whisper Chat Application
 *
 * Handles application-wide routing, authentication state management,
 * and provides the main layout structure for all pages.
 *
 * Key Features:
 * - Protected routing based on authentication status
 * - Global authentication state checking on app load
 * - Loading states during authentication verification
 * - Toast notifications throughout the app
 * - Responsive navigation bar
 *
 * @component
 * @author Hassan Abdukadirov
 */

// Import navigation component that appears on all pages
import Navbar from "./components/Navbar";
// Import React Router components for client-side routing
import { Routes, Route, Navigate } from "react-router-dom";
// Import all page components
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
// Import Zustand store for authentication state management
import { useAuthStore } from "./store/useAuthStore.js";
// Import React hooks
import { useEffect } from "react";
// Import loading spinner icon from Lucide React
import { Loader } from "lucide-react";
// Import toast notification system
import { Toaster } from "react-hot-toast";

const App = () => {
  // Extract authentication state and functions from Zustand store
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  /**
   * Check user authentication status when app loads
   * This runs once when the component mounts
   */
  useEffect(() => {
    checkAuth(); // Verify if user is logged in by checking server
  }, [checkAuth]); // Dependency array ensures this runs when checkAuth changes

  // Debug log to track authentication state changes
  console.log({ authUser });

  /**
   * Show loading spinner while checking authentication
   * Only show if we're checking auth AND user is not authenticated
   * This prevents showing loader when user is already logged in
   */
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme="cupcake">
      {/* Navigation bar - appears on all pages */}
      <Navbar />

      {/* Main routing configuration */}
      <Routes>
        {/* Home route - protected, redirects to login if not authenticated */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />

        {/* Sign up route - only accessible when not logged in */}
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />

        {/* Login route - only accessible when not logged in */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        {/* Settings route - accessible to all users (could be protected later) */}
        <Route path="/settings" element={<SettingsPage />} />

        {/* Profile route - protected, redirects to login if not authenticated */}
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      {/* Global toast notification container */}
      {/* This enables toast notifications throughout the entire app */}
      <Toaster />
    </div>
  );
};

export default App;
