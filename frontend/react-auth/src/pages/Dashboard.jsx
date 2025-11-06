import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-10 w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Dashboard</h2>

        <div className="bg-white/10 rounded-xl p-6 text-white shadow-inner mb-6">
          <h3 className="text-xl font-semibold mb-2">Welcome, {user?.name || 'User'} 👋</h3>
          <p className="text-gray-200">
            Role: <span className="font-medium text-teal-300">{user?.role || 'User'}</span>
          </p>
        </div>

        <button
          onClick={logout}
          className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md font-medium transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
