import config from "../config";

/** 
 * @Desc: 
 * username, password, isAdmin
 * login authentication
 */
const loginApi = async (username, password) => {

  try {
    const res = await fetch(`${config.appBaseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password })
    });

    const result = await res.json();

    if(res.ok) {
      alert(result.message);
      return result;
    } else {
      alert(result.message);
      return null;
    }
  } catch (err) {
    throw new Error('Failed to fetch data from server');
  }
}

/** 
 * @Desc: 
 * refreshToken: get from Cookies
 * Logout user from server
 */
const logoutApi = async (refreshToken) => {
 try {
  const res = await fetch(`${config.appBaseUrl}/api/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refreshToken: refreshToken})
  });

  const result = await res.json();

  alert(result.message);
  return result;

 } catch (err) {
  throw new Error('Failed to logout from server');
 }
}

/** 
 * @Desc: 
 * token: refreshToken from Cookies
 * Api for protected data to get new access token from server
 */
const refreshAccessTokenApi = async (refreshToken) => {

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const res = await fetch(`${config.appBaseUrl}/api/auth/refresh-access-token`, {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });

    const data = await res.json();

    if (res.ok) {
      return data.accessToken;
    } else {
      throw new Error(data.message || 'Failed to refresh token');
    }

  } catch (err) {
    console.error('Error refreshing access token:', err);
    return null;
  }
}

export {
  loginApi, 
  logoutApi,
  refreshAccessTokenApi
};
