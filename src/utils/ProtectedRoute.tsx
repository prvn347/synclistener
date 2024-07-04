import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "../components/Spinner";

const ProtectedRoute: React.FC = () => {
  const { user, loading, error } = useAuth();

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    ); // Or some spinner/loading component
  }

  if (error) {
    console.error(error);
    return <Navigate to="/signin" replace />;
  }

  return user?.name ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
