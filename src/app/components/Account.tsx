"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface User {
  _id: string;
  username: string;
  email: string;
  mobile?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  bio?: string;
  profilePicture?: string;
}

const Account = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState<Partial<User>>({});
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("=== FRONTEND DEBUG ===");
        console.log("Token exists:", !!token);
        console.log(
          "Token preview:",
          token ? token.substring(0, 20) + "..." : "none"
        );

        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        // Try to decode the token to see its structure (for debugging)
        try {
          const tokenParts = token.split(".");
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            console.log("Token payload:", payload);
            console.log("Token expires:", new Date(payload.exp * 1000));
            console.log("Token issued:", new Date(payload.iat * 1000));
          }
        } catch (decodeErr) {
          console.log("Could not decode token:", decodeErr);
        }

        console.log(
          "Making request to: `${process.env.NEXT_PUBLIC_API_URL}/api/data/me`"
        );
        console.log("With headers:", {
          Authorization: `Bearer ${token.substring(0, 20)}...`,
        });

        // Fixed API endpoint to match your route
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/data/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response received:", response.status);
        console.log("Response data:", response.data);

        // Fixed to match your controller response structure
        const userData = response.data.data;
        setUser(userData);
        setTempUser(userData);
        console.log("=== END FRONTEND DEBUG ===");
      } catch (err: unknown) {
        console.log("=== FRONTEND ERROR DEBUG ===");
        if (axios.isAxiosError(err)) {
          console.log("Error status:", err.response?.status);
          console.log("Error data:", err.response?.data);
        } else {
          console.log("Full error:", err);
        }
        console.log("=== END ERROR DEBUG ===");

        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setError("Authentication failed. Please log in again.");
          localStorage.removeItem("token");
        } else {
          setError("Failed to fetch user data");
        }
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle file selection for profile picture
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      setProfileImage(file);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle text input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTempUser((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes
  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Append editable fields
      if (tempUser.username !== user.username) {
        formData.append("username", tempUser.username || "");
      }
      if (tempUser.firstName !== user.firstName) {
        formData.append("firstName", tempUser.firstName || "");
      }
      if (tempUser.lastName !== user.lastName) {
        formData.append("lastName", tempUser.lastName || "");
      }
      if (tempUser.bio !== user.bio) {
        formData.append("bio", tempUser.bio || "");
      }
      if (tempUser.address !== user.address) {
        formData.append("address", tempUser.address || "");
      }
      if (tempUser.city !== user.city) {
        formData.append("city", tempUser.city || "");
      }
      if (tempUser.state !== user.state) {
        formData.append("state", tempUser.state || "");
      }
      if (tempUser.country !== user.country) {
        formData.append("country", tempUser.country || "");
      }

      // Append image if selected
      if (profileImage) {
        formData.append("profilePicture", profileImage);
      }

      // Fixed API endpoint to match your route
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/data/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Fixed to match your controller response structure
      const updatedUser = response.data.data;
      setUser(updatedUser);
      setTempUser(updatedUser);
      setIsEditing(false);
      setProfileImage(null);
      setImagePreview(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError("Authentication failed. Please log in again.");
          localStorage.removeItem("token");
        } else {
          setError("Failed to update profile. Please try again.");
        }
        console.error("Axios error updating user:", err.response?.data);
      } else {
        setError("An unexpected error occurred.");
        console.error("Unknown error:", err);
      }
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setTempUser(user || {});
    setProfileImage(null);
    setImagePreview(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="bg-[#FCFBF9] rounded-3xl p-7 text-black shadow-md w-full max-w-2xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="bg-[#FCFBF9] rounded-3xl p-7 text-black shadow-md w-full max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-[#FCFBF9] rounded-3xl p-7 text-black shadow-md w-full max-w-2xl mx-auto">
        <div className="text-center text-gray-500">No user data found</div>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFBF9] rounded-3xl p-7 text-black shadow-md w-full mx-auto overflow-hidden">
      <h2 className="text-2xl font-bold mb-6">Account Information</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8 overflow-y-auto md:max-h-[60vh] max-h-[75vh]">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <Image
              width={128}
              height={128}
              src={
                imagePreview ||
                (user.profilePicture
                  ? `${process.env.NEXT_PUBLIC_API_URL}${user.profilePicture}`
                  : "/images/Avatar.png")
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/Avatar.png";
              }}
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            )}
          </div>
          {isEditing && profileImage && (
            <p className="text-sm text-gray-600 text-center">
              New photo selected
            </p>
          )}
        </div>

        {/* User Information Section */}
        <div className="flex-1 space-y-4">
          {/* Username - Editable */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={tempUser.username || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 outline-blue-700"
                placeholder="Enter username"
              />
            ) : (
              <p className="p-2 bg-gray-100 rounded-md">
                {user.username || "Not set"}
              </p>
            )}
          </div>

          {/* First Name - Editable */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={tempUser.firstName || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 outline-blue-700"
                placeholder="Enter first name"
              />
            ) : (
              <p className="p-2 bg-gray-100 rounded-md">
                {user.firstName || "Not set"}
              </p>
            )}
          </div>

          {/* Last Name - Editable */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={tempUser.lastName || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 outline-blue-700"
                placeholder="Enter last name"
              />
            ) : (
              <p className="p-2 bg-gray-100 rounded-md">
                {user.lastName || "Not set"}
              </p>
            )}
          </div>

          {/* Email - Read Only */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <p className="p-2 bg-gray-50 rounded-md text-gray-600 border border-gray-200">
              {user.email}
            </p>
          </div>

          {/* Mobile - Read Only */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile
            </label>
            <p className="p-2 bg-gray-50 rounded-md text-gray-600 border border-gray-200">
              {user.mobile || "Not provided"}
            </p>
          </div>

          {/* City - Editable */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            {isEditing ? (
              <input
                type="text"
                name="city"
                value={tempUser.city || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 outline-blue-700"
                placeholder="Enter city"
              />
            ) : (
              <p className="p-2 bg-gray-100 rounded-md">
                {user.city || "Not set"}
              </p>
            )}
          </div>

          {/* State - Editable */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            {isEditing ? (
              <input
                type="text"
                name="state"
                value={tempUser.state || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 outline-blue-700"
                placeholder="Enter state"
              />
            ) : (
              <p className="p-2 bg-gray-100 rounded-md">
                {user.state || "Not set"}
              </p>
            )}
          </div>

          {/* Country - Editable */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            {isEditing ? (
              <input
                type="text"
                name="country"
                value={tempUser.country || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 outline-blue-700"
                placeholder="Enter country"
              />
            ) : (
              <p className="p-2 bg-gray-100 rounded-md">
                {user.country || "Not set"}
              </p>
            )}
          </div>

          {/* Address - Editable */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={tempUser.address || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded p-2 mt-2 w-full text-black focus:outline-offset-1 outline-blue-700"
                placeholder="Enter address"
              />
            ) : (
              <p className="p-2 bg-gray-100 rounded-md">
                {user.address || "Not set"}
              </p>
            )}
          </div>

          {/* Bio - Editable */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            {isEditing ? (
              <textarea
                name="bio"
                value={tempUser.bio || ""}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-offset-1 outline-blue-700 resize-none"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="p-2 bg-gray-100 rounded-md min-h-[76px]">
                {user.bio || "No bio added yet"}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {saving && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
