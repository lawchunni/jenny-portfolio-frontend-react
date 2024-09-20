import { useAuth } from "../contexts/AuthContext"
import Cookies from 'js-cookie';
import { logoutApi } from "../services/authApi";
import { useCallback } from "react";

const useLogout = () => {
  const { logout } = useAuth();
  
  const logoutFromServer = useCallback( async () => {
    const refreshToken = Cookies.get('refreshToken');

    if (!refreshToken) {
      console.warm('No refresh token found, logging out client side.');
      return logout();
    }
    
    try {
      const result = await logoutApi(refreshToken);
      if(result) {
        logout();
      }
    } catch (err) {
      console.error('Failed to logout from server', err);
      logout();
    }
  }, [logout]);

  return logoutFromServer;
}

export { useLogout };
