import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/profile");
      } else {
        setError(data.msg || "Login failed");
      }
    } catch (err) {
      setError("Unexpected error, please try again");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
        aria-label="Login form"
        noValidate
      >
        {/* Back button inside form */}
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
          Welcome Back
        </h2>

        {error && (
          <p className="mb-4 text-center text-red-600 bg-red-100 px-3 py-2 rounded">
            {error}
          </p>
        )}

        <label
          htmlFor="email"
          className="block mb-1 text-gray-700 dark:text-gray-300 font-medium"
        >
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

        <label
          htmlFor="password"
          className="block mb-1 text-gray-700 dark:text-gray-300 font-medium"
        >
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
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-white focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? (
              <FaEyeSlash className="w-5 h-5" />
            ) : (
              <FaEye className="w-5 h-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className={`flex items-center justify-center w-full py-3 rounded-xl font-semibold text-white transition focus:outline-none focus:ring-4 ${
            loading
              ? "bg-blue-700 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300"
          } dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400`}
        >
          {loading && (
            <FaSpinner className="animate-spin mr-2 text-lg" aria-hidden="true" />
          )}
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
