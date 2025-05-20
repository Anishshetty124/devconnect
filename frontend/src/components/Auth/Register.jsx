import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaSpinner, FaArrowLeft } from "react-icons/fa";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const text = await res.text();  // get raw response
    console.log("Raw response text:", text);

    // try parsing JSON only if not empty
    const data = text ? JSON.parse(text) : {};

    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/Login");
    } else {
      alert(data.msg || "Registration failed");
    }
  } catch (err) {
    console.error("Register Error:", err);
    alert("Something went wrong");
  }
  setLoading(false);
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
        aria-label="Register form"
        noValidate
      >
        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-indigo-600 hover:text-indigo-800 focus:outline-none"
          aria-label="Go back"
        >
          <FaArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 dark:text-indigo-400">
          Register
        </h2>

        <label htmlFor="username" className="block mb-4 text-gray-700 dark:text-gray-300 font-medium">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Your username"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />

        <label htmlFor="email" className="block mb-4 text-gray-700 dark:text-gray-300 font-medium">
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <label htmlFor="password" className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
          Password
        </label>
        <div className="relative mb-6">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-white focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className={`flex items-center justify-center w-full py-3 rounded-xl font-semibold text-white transition focus:outline-none focus:ring-4 ${
            loading
              ? "bg-indigo-700 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-300 dark:focus:ring-indigo-400"
          }`}
        >
          {loading && <FaSpinner className="animate-spin mr-2 text-lg" aria-hidden="true" />}
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
