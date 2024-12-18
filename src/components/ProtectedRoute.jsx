import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../pages/UserContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !currentUser.is_admin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
