import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function RoleRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (!user) return <Navigate to="/login" />; // not logged in
  if (user.role !== role) return <Navigate to="/" />; // wrong role

  return children;
}
