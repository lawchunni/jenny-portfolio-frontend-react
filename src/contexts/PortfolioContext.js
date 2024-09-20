import { useEffect, useState, createContext } from "react";
import { fetchPortfolioFromAPI } from "../services/portfolioApi";

const PortfolioContext = createContext();

const PortfolioContextProvider = ({ children, isAdmin = false }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  
  useEffect(() => {
    if (isAdmin && token) {
      fetchData(token);
    } else {
      fetchData('');
    }
  }, [isAdmin, token]);

  const fetchData = async (getToken) => {
    try {
      const fetchedData = await fetchPortfolioFromAPI(getToken);

      if(fetchPortfolioFromAPI) {
        setData(fetchedData);
        setLoading(false);
      }
      
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  // setter for other components to update token 
  const updateToken = (token) => {
    setToken(token);
  }

  return (
    <PortfolioContext.Provider value={{ data, loading, error, updateToken }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export { PortfolioContext, PortfolioContextProvider };
