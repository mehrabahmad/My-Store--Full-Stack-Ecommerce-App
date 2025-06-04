// import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">
          Please login to view your profile.
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          My Profile
        </h1>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <span className="text-gray-600 font-medium">Name:</span>
            <span className="text-gray-900">{user.name}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-3">
            <span className="text-gray-600 font-medium">Email:</span>
            <span className="text-gray-900">{user.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">User ID:</span>
            <span className="text-gray-900">{user._id}</span>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => alert("Update feature coming soon!")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
