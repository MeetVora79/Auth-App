import React, { useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';


export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);


  const submit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await api.post('/forgot-password', { email });
      setMessage(res.data.message || 'If that email exists, a reset link was sent.');
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Error sending reset email.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">Forgot Password</h2>

        {message && (
          <div
            className={`text-center p-2 mb-4 rounded ${
              message.toLowerCase().includes('error') || message.toLowerCase().includes('fail')
                ? 'bg-red-500/20 text-red-200'
                : 'bg-green-500/20 text-green-200'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-white text-sm mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              className="w-full px-3 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="block text-white text-sm mt-1">Back to <Link to="/login" className="text-teal-200 hover:text-teal-400">Login</Link></p>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md font-semibold transition-all"
          >
             {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
