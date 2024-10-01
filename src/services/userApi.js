import config from "../config";

/** 
 * @Desc: 
 * fetch Users list from server for admin section
 */
const fetchUsersFromApi = async (token) => {

  if (!token) return null;

  try {
    const res = await fetch(`${config.appBaseUrl}/api/users/admin/list`, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token.replace(/['"]+/g, '')}`,
      }
    });

    const result = await res.json();

    if (res.ok) {
      return result;
    } else {
      alert('Failed to fetch user from api: ' + result.message);
      return null;
    }
    
  } catch (err) {
    throw new Error('Failed to user data from API');
  }
}

/** 
 * @Desc: 
 * post new user to database use api in admin section
 */
const createUserApi = async (token, inputData) => {
  // check token before sending from to server
  if (!token) return null;

  try {
    const res = await fetch(`${config.appBaseUrl}/api/users/admin/create`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization' : `Bearer ${token.replace(/['"]+/g, '')}`,
      },
      body: inputData
    });

    if (res.ok) {
      const data = await res.json();
      alert(data.message);
      return true;
    } else {
      alert('Failed to create user');
      return false;
    }

  } catch (error) {
    alert('Error: ' + error.message);
  }
}

export { fetchUsersFromApi, createUserApi };
