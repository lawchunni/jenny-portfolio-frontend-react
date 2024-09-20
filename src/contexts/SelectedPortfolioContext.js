import { createContext, useEffect, useState } from "react"
import { fetchSelectedPortfolioFromAPI } from "../services/portfolioApi";

const SelectedPortfolioContext = createContext();

/**
 * 
 * @param {*} path to be passed into api to fetch data from database. eg. 'portfolio', 'admin/portfolio-edit'. No '/' in the front or at the end
 * @returns 
 */
const SelectedPortfolioContextProvider = ({path, children, isAdmin = false}) => {

  const [id, setId] = useState(null)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {

    // fetch a single portfolio item from server
    const fetchData = async (getToken) => {
      
      try {
        setError(false);
        
        const fetchedData = await fetchSelectedPortfolioFromAPI(getToken, path, id);
        if(fetchedData) {
          setData(fetchedData);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      }
    }

    if (isAdmin && id && token) {
      fetchData(token);
    } else if (!isAdmin && id) {
      fetchData('');
    }

  }, [path, token, isAdmin, id]);

  const updateId = (id) => {
    setId(id);
  }

  const updateToken = (token) => {
    setToken(token);
  }


  return (
    <SelectedPortfolioContext.Provider value={{ data, loading, error, updateId, updateToken }}>
      {children}
    </SelectedPortfolioContext.Provider>
  )
}

export {SelectedPortfolioContext, SelectedPortfolioContextProvider};
