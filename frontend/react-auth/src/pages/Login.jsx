import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === "admin") navigate("/admin");
      else navigate("/");
    } catch (error) {
      setErr(
        error?.response?.data?.errors
          ? JSON.stringify(error.response.data.errors)
          : error?.response?.data?.error || "Failed to login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Welcome Back
        </h2>

        {err && (
          <div className="bg-red-500/20 text-red-200 text-sm p-2 rounded mb-4 text-center">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-white text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-md bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 rounded-md bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md font-semibold transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between items-center text-sm text-gray-200 mt-4">
          <Link
            to="/forgot-password"
            className="text-teal-200 hover:text-teal-400"
          >
            Forgot password?
          </Link>
          <p>
            Don't have an account?&nbsp;
            <Link to="/register" className="text-teal-200 hover:text-teal-400">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
