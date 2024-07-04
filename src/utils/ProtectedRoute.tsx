import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute: React.FC = () => {
  const user = useAuth();
  console.log(user);

  return user?.name ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
