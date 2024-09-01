import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SelectedPortfolioContext } from "../../contexts/SelectedPortfolioContext";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import PortfolioForm from "../../components/admin/PortfolioForm";

const PortfolioEdit = () => {

  const portfolioId = useParams();

  // load data from database
  const {data, loading, error, updateId} = useContext(SelectedPortfolioContext);

  useEffect(() => {
    if(portfolioId) {
      updateId(portfolioId.id);
    }

  }, [updateId, portfolioId]);

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
