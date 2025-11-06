import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // or wherever your hook is

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Loading...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}
