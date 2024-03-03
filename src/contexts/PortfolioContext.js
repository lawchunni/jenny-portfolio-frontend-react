import { useEffect, useState, createContext } from "react";
import { fetchDataFromAPI } from "../services/portfolioApi";

const PortfolioContext = createContext();

const PortfolioContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedData = await fetchDataFromAPI();
      console.log(fetchedData)
      setData(fetchedData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  return (
    <PortfolioContext.Provider value={{ data, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export { PortfolioContext, PortfolioContextProvider };