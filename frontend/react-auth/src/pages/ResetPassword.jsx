import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialToken = searchParams.get("token") || "";
  const initialEmail = searchParams.get("email") || "";

  const [form, setForm] = useState({
    email: initialEmail,
    token: initialToken,
    password: "",
    password_confirmation: "",
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await api.post("/reset-password", form);
      setMessage(res.data.message || "Password reset successfully!");
      // Redirect to login after short delay
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const errMsg =
        err?.response?.data?.message ||
        (err?.response?.data?.errors
          ? Object.values(err.response.data.errors).flat().join(" ")
          : "Reset failed.");
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Reset Password
        </h2>

        {message && (
          <div
            className={`text-center p-2 mb-4 rounded ${
              message.toLowerCase().includes("failed") ||
              message.toLowerCase().includes("error")
                ? "bg-red-500/20 text-red-200"
                : "bg-green-500/20 text-green-200"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="New Password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={form.password_confirmation}
              onChange={(e) =>
                setForm({ ...form, password_confirmation: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md font-semibold transition-all"
          >
            {loading ? "Resetting..." : "Reset password"}
          </button>
        </form>
      </div>
    </div>
  );
}
