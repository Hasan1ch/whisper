/**
 * ProfilePage Component
 *
 * Displays and manages user profile information including:
 * - Profile picture upload and display
 * - User details (name, email)
 * - Account information (member since, status)
 *
 * Features:
 * - Image upload with base64 conversion
 * - Real-time upload status feedback
 * - Responsive design with Tailwind CSS
 * - Integration with Zustand auth store
 *
 * @component
 * @author Hassan Abdukadirov
 */

import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  // Extract auth state and functions from Zustand store
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  // Local state for image preview before upload
  const [selectedImg, setSelectedImg] = useState(null);

  /**
   * Handles profile image upload
   * Converts selected file to base64 and sends to backend
   *
   * @param {Event} e - File input change event
   */
  const handleImageUpload = async (e) => {
    // Get the selected file from input
    const file = e.target.files[0];
    if (!file) return;

    // Create FileReader to convert file to base64
    const reader = new FileReader();

    // Start reading the file as data URL (base64)
    reader.readAsDataURL(file);

    // Handle when file reading is complete
    reader.onload = async () => {
      // Get the base64 string result
      const base64Image = reader.result;

      // Set image preview immediately for better UX
      setSelectedImg(base64Image);

      // Send image to backend via auth store
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20">
      {/* Main container with max width and padding */}
      <div className="max-w-2xl mx-auto p-4 py-8">
        {/* Profile card with rounded corners and background */}
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          {/* Header section */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {/* Profile image with fallback to default avatar */}
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />

              {/* Camera icon overlay for upload trigger */}
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    // Disable interaction during upload
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />

                {/* Hidden file input */}
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*" // Only allow image files
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile} // Prevent multiple uploads
                />
              </label>
            </div>

            {/* Upload status text */}
            <p className="text-sm text-zinc-400">
              {
                isUpdatingProfile
                  ? "Uploading..." // Show during upload
                  : "Click the camera icon to update your photo" // Default instructions
              }
            </p>
          </div>

          {/* User information section */}
          <div className="space-y-6">
            {/* Full name field */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.fullName}
              </p>
            </div>

            {/* Email field */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account information section */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              {/* Member since date */}
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>
                  {/* Format date to show only the date part (YYYY-MM-DD) */}
                  {authUser.createdAt?.split("T")[0]}
                </span>
              </div>

              {/* Account status */}
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
