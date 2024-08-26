// fetch pofolio list from API
const fetchPortfolioFromAPI = async () => {
  try {
    const res = await fetch('http://127.0.0.1:4000/portfolio');
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error('Failed to fetch data from API');
  }
};

// fetch single portfolio item from API
const fetchSelectedPortfolioFromAPI = async (path, id) => {
  try {
    const res = await fetch(`http://127.0.0.1:4000/${path}/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error('Failed to fetch data from API');
  }
}

/** 
 * javascript comment 
 * @Author: Jenny 
 * @Date: 2024-08-05 18:38:11 
 * @Desc: 
 * (path): eg. portfolio-edit
 * (id): single portfolio id
 * (inputData): Object item
 * Update a record in portfolio collection
 */
const updatePortfolioApi = async (path, id, inputData) => {
  try {
    const res = await fetch(`http://127.0.0.1:4000/admin/${path}/${id}`, {
      method: 'PUT',
      mode: 'cors',
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
  fetchSelectedPortfolioFromAPI,
  updatePortfolioApi
};