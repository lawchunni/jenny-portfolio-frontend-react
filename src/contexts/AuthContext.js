import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage('auth', null);
  const [admin, setAdmin] = useLocalStorage('admin', null);
  const navigate = useNavigate();

  // to authenticate user during login process  
  const login = useCallback((data) => {
    setAuth(data.token);
    setAdmin(data.isAdmin);
    navigate("/admin/portfolio-list");
  }, [auth, setAuth, setAdmin, navigate]);

  // used to logout auth user 
  const logout = useCallback(() => {
    setAuth(null);
    setAdmin(null);
    navigate("/", {replace: true});
  }, [navigate]);

  const contextValue  = useMemo(() => ({
    auth,
    admin,
    login,
    logout
  }), [auth, admin, login, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }
