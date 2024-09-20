/** 
 * @Desc:  
 * fetch pofolio list from API
 */
const fetchPortfolioFromAPI = async () => {
  try {
    const res = await fetch('http://127.0.0.1:4000/portfolio', {
      method: 'GET',
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
};

/** 
 * @Desc:  
 * fetch admin pofolio list from API
 */
const fetchAdminPortfolioFromAPI = async (token) => {
  try {
    const res = await fetch('http://127.0.0.1:4000/admin/portfolio', {
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
};

/** 
 * @Desc:  
 * (path): eg. admin/portfolio-edit
 * (id): portfolio item id
 * fetch single portfolio item from API
 */
const fetchSelectedPortfolioFromAPI = async (token, path, id) => {

  try {
    const res = await fetch(`http://127.0.0.1:4000/${path}/${id}`, {
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
 * (inputData): create new item in object format
 * Create a new record in portfolio collection
 */
const createPortfolioApi = async (token, inputData) => {
  
  try {
    const res = await fetch(`http://127.0.0.1:4000/admin/portfolio`, {
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
      alert(`Failed to create portfolio item`);
      return false;
    }
  } catch (error) {
    alert('Error: ' + error.message);
    return false;
  }
}

/** 
 * @Desc: 
 * (path): eg. portfolio-edit
 * (id): single portfolio id
 * (inputData): update item in object format
 * Update a record in portfolio collection
 */
const updatePortfolioApi = async (token, path, id, inputData) => {

  try {
    const res = await fetch(`http://127.0.0.1:4000/admin/${path}/${id}`, {
      method: 'PUT',
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
      alert(`Failed to update portfolio item`);
      return false;
    }
  } catch (error) {
    alert('Error: ' + error.message);
    return false;
  }
}

export {
  fetchPortfolioFromAPI, 
  fetchAdminPortfolioFromAPI,
  fetchSelectedPortfolioFromAPI,
  createPortfolioApi,
  updatePortfolioApi
};