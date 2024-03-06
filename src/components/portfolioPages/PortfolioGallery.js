import { useContext } from "react";
import { PortfolioContext } from "../../contexts/PortfolioContext";
import PortfolioItems from "./PortfolioItems";
import Loading from "../common/Loading";
import Error from "../common/Error";

function PortfolioGallery () {
  
  const { data, loading, error } = useContext(PortfolioContext);

  if(loading) return (<><Loading /></>);

  if(error) return (<><Error /></>);

  return (
    <>
      <section id="portfolio">
        <div className="wrapper">
          <h1>Portfolio</h1>

          <div className="content">
            <PortfolioItems items={data} />
          </div>
        </div>
      </section>
    </>
  )
}

export default PortfolioGallery;
