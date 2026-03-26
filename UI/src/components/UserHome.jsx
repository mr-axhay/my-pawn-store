import { useState } from "react";
import "./UserHome.css";
export default function UserHome() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Top Tabs */}
      <div className="flex border-b border-gray-300 bg-gradientt rounded-t-xl px-4">
        <TabButton
          label="Details"
          value="details"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <TabButton
          label="Change Password"
          value="changePassword"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <TabButton
          label="Edit Profile"
          value="editProfile"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Content Area */}
      <div className="bg-gradientt p-6 rounded-b-xl shadow-md">
        {activeTab === "details" && <UserDetails />}
        {activeTab === "changePassword" && <ChangePassword />}
        {activeTab === "editProfile" && <EditProfile />}
      </div>
    </div>
  );
}

/* 🔹 Tab Button */
function TabButton({ label, value, activeTab, setActiveTab }) {
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`tab-button relative px-6 py-4 text-sm font-semibold transition-all duration-300
        ${isActive ? "text-purple-600" : "text-gray-500 hover:text-gray-700"}
      `}
    >
      {label}

      {/* Underline Indicator */}
      {isActive && (
        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-purple-600"></span>
      )}
    </button>
  );
}

/* 🔹 Details */
function UserDetails() {
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <p className="mb-2">Name: {name}</p>
      <p>Email: {email}</p>
    </div>
  );
}

/* 🔹 Change Password */
function ChangePassword() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>

      <input
        type="password"
        placeholder="Old Password"
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        type="password"
        placeholder="New Password"
        className="border p-2 w-full mb-3 rounded"
      />

      <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
        Update Password
      </button>
    </div>
  );
}

/* 🔹 Edit Profile */
function EditProfile() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-3 rounded"
      />

      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Save Changes
      </button>
    </div>
  );
}
