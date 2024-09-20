import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

// Protect from the access from non-users 
const ProtectedRoute = () => {
  const { accessToken, getRefreshToken } = useAuth();

  return (accessToken || getRefreshToken()) ? <Outlet /> : <Navigate to="/login" />
};

export default ProtectedRoute;
