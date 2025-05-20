import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  // Use username instead of fullName
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/user/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Send username and bio
        body: JSON.stringify({ username, bio }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.msg || "Failed to update profile");
        setLoading(false);
        return;
      }

      const updatedUser = await res.json();
      setUser(updatedUser); // Update user in context
      navigate("/profile"); // Redirect to profile
    } catch (err) {
      setError("Unexpected error occurred.");
      setLoading(false);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600 dark:text-indigo-400">
          Edit Profile
        </h2>

        {error && (
          <p className="mb-4 text-center text-red-600 bg-red-100 px-3 py-2 rounded">
            {error}
          </p>
        )}

        <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-3 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          placeholder="Your username"
          required
        />

        <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          className="w-full mb-6 p-3 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          placeholder="Tell us about yourself"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded font-semibold text-white ${
            loading
              ? "bg-indigo-700 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
