import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await register(form);
      navigate('/');
    } catch (error) {
      setErr(
        error?.response?.data?.errors
          ? JSON.stringify(error.response.data.errors)
          : error?.response?.data?.error || 'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        {err && (
          <p className="bg-red-500/20 border border-red-500 text-red-300 text-sm p-2 rounded mb-4 text-center">
            {err}
          </p>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 rounded-md bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-200"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2 rounded-md bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-200"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-2 rounded-md bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-200"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={form.password_confirmation}
              onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
              className="w-full p-2 rounded-md bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-md transition disabled:opacity-60"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-200">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-200 hover:text-teal-400">
             Login
          </Link>
        </p>
      </div>
    </div>
  );
}
