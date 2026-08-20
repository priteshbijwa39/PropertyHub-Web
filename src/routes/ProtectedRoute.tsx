import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = () => {
  // const token = localStorage.getItem("propertyhub_token");
   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;