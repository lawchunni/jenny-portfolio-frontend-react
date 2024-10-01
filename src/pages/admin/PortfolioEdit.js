import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import PortfolioForm from "../../components/admin/PortfolioForm";
import { useAuth } from "../../contexts/AuthContext";
import { useLogout } from "../../hooks/useLogout";
import { useTokenValidation } from "../../hooks/useTokenValidation";
import { fetchAdminPortfolioSingleFromAPI } from "../../services/portfolioApi";

const PortfolioEdit = () => {

  const portfolioId = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const { accessToken, getRefreshToken } = useAuth();
  const { validateAndFetchData } = useTokenValidation();
  const  logoutFromServer = useLogout();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        // validate the token before fetching the data 
        // Pass the portfolio id to the server from here 
        const fetchedData = await validateAndFetchData({
          fetchDataFunc: fetchAdminPortfolioSingleFromAPI, 
          id: portfolioId.id
        });

        if (fetchedData) {
          setData(fetchedData);
          setLoading(false);
        } else {
          // only logout user when refresh token is missing
          if (!getRefreshToken()) {
            const handleLogout = async () => {
              await logoutFromServer();
            }
            handleLogout();
            return;
          }
        }
      } catch (err) {
        setError(true);
        console.error('Failed to load portfolio:', err);
      }
    }

    fetchData();

  }, [portfolioId, getRefreshToken, accessToken, logoutFromServer, validateAndFetchData]);

  if (loading) return (<><Loading /></>);

  if (error) return (<><Error /></>);

  return (
    <>
      <section id="admin_edit" className="section_white">
        <div className="wrapper">
          <div className="content">
            
            <h1>Portfolio Edit</h1>

            <PortfolioForm type="update" data={data} />
   
          </div>
        </div>
      </section>
    </>
  )
}

export default PortfolioEdit;
