/** 
 * @Desc: 
 * username, password, isAdmin
 * login authentication
 */
const authApi = async (username, password) => {

  try {
    const res = await fetch('http://127.0.0.1:4000/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password })
    });

    const result = await res.json();

    if(res.ok) {
      // await login(result);

      console.log('authapi: ', result)

      alert(result.message);
      return result;
    } else {
      alert(result.message);
      return null;
    }
  } catch (err) {
    throw new Error('Failed to fetch data from API');
  }
}

export default authApi;
