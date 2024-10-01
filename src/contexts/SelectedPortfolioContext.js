import { createContext, useEffect, useState } from "react"
import { fetchPortfolioSingleFromAPI } from "../services/portfolioApi";

const SelectedPortfolioContext = createContext();

/**
 * 
 * @param {*} 
 * @returns 
 */
const SelectedPortfolioContextProvider = ({children, isAdmin = false}) => {

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
        
        const fetchedData = await fetchPortfolioSingleFromAPI(id);
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

  }, [token, isAdmin, id]);

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
