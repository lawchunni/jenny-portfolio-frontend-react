import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [admin, setAdmin] = useLocalStorage('admin', null);
  const navigate = useNavigate();

  // to authenticate user during login process  
  const login = useCallback((data) => {
    setAccessToken(data.accessToken);
    Cookies.set('refreshToken', data.refreshToken, { expires: 7});
    setAdmin(data.isAdmin);
    navigate("/admin/portfolio-list");
  }, [setAccessToken, setAdmin, navigate]);

  // used to logout auth user 
  const logout = useCallback(() => {
    setAccessToken(null);
    Cookies.remove('refreshToken');
    setAdmin(null);
    navigate("/", {replace: true});
  }, [setAccessToken, setAdmin, navigate]);

  // get refresh token from cookies
  const getRefreshToken = useCallback(() => {
    return Cookies.get('refreshToken');
  }, []);

  // Set refreshToken in cookies
  const setRefreshToken = useCallback((token) => {
    Cookies.set('refreshToken', token, { expires: 7 });
  }, []);

  const contextValue  = useMemo(() => ({
    accessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
    admin,
    login,
    logout
  }), [accessToken, setAccessToken, getRefreshToken, setRefreshToken, admin, login, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }
