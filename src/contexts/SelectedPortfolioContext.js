import { createContext, useEffect, useState } from "react"
import { fetchSelectedPortfolioFromAPI } from "../services/portfolioApi";

const SelectedPortfolioContext = createContext();

/**
 * 
 * @param {*} path to be passed into api to fetch data from database. eg. 'portfolio', 'admin/portfolio-edit'. No '/' at front or end
 * @returns 
 */
const SelectedPortfolioContextProvider = ({path, children}) => {

  const [id, setId] = useState(null)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchSelectedPortfolioFromAPI(path, id);
        if(fetchedData) {
          setData(fetchedData);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (err) {
        setError(err);
        setError(false);
      }
    }

    if(id) {
      fetchData();
    }
  }, [path, id]);

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
