// fetch Users list from server
const fetchUsersFromApi = async () => {
  try {
    const res = await fetch('http://127.0.0.1:4000/users');
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error('Failed to fetch data from API');
  }
}

// post new user to database use api
const postUser = async (email, password, isAdmin) => {
  try {
    const res = await fetch('http://127.0.0.1:4000/users', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        isAdmin: isAdmin
      })
    });

    if (res.ok) {
      const data = await res.json();
      alert(data.message);
    } else {
      alert('Failed to create user');
    }

  } catch (error) {
    alert('Error: ' + error.message);
  }
}

export { fetchUsersFromApi, postUser };
