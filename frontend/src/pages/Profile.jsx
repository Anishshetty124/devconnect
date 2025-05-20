import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaChevronDown, FaEdit, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });  // <-- Use replace here to avoid stacking history
  };

  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-600 dark:text-gray-300">
        Loading...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <nav className="bg-white dark:bg-gray-800 shadow sticky top-0 z-20 px-6 py-4 flex justify-between items-center">
        <h1
          className="text-xl font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          DevConnect
        </h1>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-sm font-medium focus:outline-none"
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-8 h-8 text-gray-500 dark:text-gray-400" />
            )}
            <span>{user.username}</span>
            <FaChevronDown className="text-gray-500 dark:text-gray-300" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-30">
              <button
                onClick={() => {
                  navigate("/profile");
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                👤 Profile
              </button>
              <button
                onClick={() => {
                  navigate("/edit-profile");
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaEdit className="inline mr-2" />
                Edit Profile
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaSignOutAlt className="inline mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="flex justify-center mt-10 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
          <div className="flex flex-col items-center text-center">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
            ) : (
              <FaUserCircle className="w-24 h-24 text-gray-400 dark:text-gray-500 mb-4" />
            )}
            <h2 className="text-2xl font-semibold">{user.fullName || user.username}</h2>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {user.bio || "No bio added yet."}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
