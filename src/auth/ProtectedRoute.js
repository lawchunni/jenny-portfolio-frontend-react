import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

// Protect from the access from non-users 
const ProtectedRoute = () => {
  const {auth} = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />
};

export default ProtectedRoute;
