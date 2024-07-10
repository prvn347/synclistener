import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "../components/Spinner";

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className=" flex justify-center items-center h-screen ">
        <Spinner />
      </div>
    );
  }

  // if (error) {
  //   console.error(error);
  //   return <Navigate to="/signin" replace />;
  // }

  return user?.name ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
