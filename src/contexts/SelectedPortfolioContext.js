import { createContext, useEffect, useState } from "react"
import { fetchSelectedPortfolioFromAPI } from "../services/portfolioApi";

const SelectedPortfolioContext = createContext();

const SelectedPortfolioContextProvider = ({ children}) => {

  const [id, setId] = useState(null)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchSelectedPortfolioFromAPI(id);
        setData(fetchedData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setError(false);
      }
    }

    if(id) {
      fetchData();
    }
  }, [id]);

  const updateId = (id) => {
    setId(id);
  }

 

  return (
    <SelectedPortfolioContext.Provider value={{ data, loading, error, updateId }}>
      {children}
    </SelectedPortfolioContext.Provider>
  )
}

export {SelectedPortfolioContext, SelectedPortfolioContextProvider};