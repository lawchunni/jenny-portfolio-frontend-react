import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext";
import Cookies from 'js-cookie';
import { refreshAccessTokenApi } from "../services/authApi";
import { useCallback } from "react";

// Helper to check if token is expired or about to expire
const isTokenExpired = (token) => {
  if (!token) return;

  const decode = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  // Check if the token is expired or will expire in the next 1 minute
  return decode.exp < currentTime + 60;
  
}

// Custom hook for managing data validation and refreshing
export const useTokenValidation = () => {
  const {accessToken, setAccessToken} = useAuth();

  const refreshToken = Cookies.get('refreshToken');

  const validateAndFetchData = useCallback( async ({
    fetchDataFunc,
    type = 'OTHER', // eg. 'OTHER', 'CREATE'
    id = null, 
    data = null
  } = {}) => {

    if (!refreshToken) return null;

    // Check if the access token is expired
    if (!accessToken || isTokenExpired(accessToken)) {
      console.log('Page reloaded / Access token is expired or expiring, refreshing...');

      // get new access token from server
      const newAccessToken = await refreshAccessTokenApi(refreshToken); 

      if (newAccessToken) {
        setAccessToken(newAccessToken);
        
        return type === 'CREATE' // for the api func which does not have data params
                  ? fetchDataFunc(newAccessToken, data)
                  : fetchDataFunc(newAccessToken, id, data);
      } else {
        throw new Error('Failed to refresh token');
      }

    } else {
      return type === 'CREATE' // for the api func which does not have data params
                ? fetchDataFunc(accessToken, data)
                : fetchDataFunc(accessToken, id, data);
    }

  }, [accessToken, refreshToken, setAccessToken]);

  return { validateAndFetchData };
} 

