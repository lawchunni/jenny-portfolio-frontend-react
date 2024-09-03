import { getLocalStorage } from "../hooks/useLocalStorage";

/** 
 * @Desc: 
 * fetch Users list from server
 */
const fetchUsersFromApi = async () => {
  const token = getLocalStorage('token');

  try {
    const res = await fetch('http://127.0.0.1:4000/users', {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token.replace(/['"]+/g, '')}`,
      }
    });

    const result = await res.json();

    if (res.ok) {
      return result;
    } else {
      alert('Failed to fetch data from api: ' + result.message);
      return null;
    }
    
  } catch (err) {
    throw new Error('Failed to fetch data from API');
  }
}

/** 
 * @Desc: 
 * post new user to database use api
 */
const createUserApi = async (username, password, isAdmin) => {
  const token = getLocalStorage('token');

  try {
    const res = await fetch('http://127.0.0.1:4000/users', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization' : `Bearer ${token.replace(/['"]+/g, '')}`,
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        isAdmin: isAdmin
      })
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
