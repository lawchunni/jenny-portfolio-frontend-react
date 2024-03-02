const fetchDataFromAPI = async () => {
  try {
    const res = await fetch('http://127.0.0.1:4000/portfolio');
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error('Failed to fetch data from API');
  }
};

export {fetchDataFromAPI};