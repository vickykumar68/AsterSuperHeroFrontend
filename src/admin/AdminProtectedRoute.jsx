import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";

const AdminProtectedRoute = ({ children }) => {
  const { role, loading } = useContext(AdminAuthContext);

  if (loading) return null; // or a spinner

  if (role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
