import { useContext } from "react";
import { PortfolioContext } from "../../contexts/PortfolioContext";
import PortfolioItem from "./PortfolioItem";

function PortfolioGallery () {
  
  const { data, loading, error } = useContext(PortfolioContext);

  if(loading) return (<><div>Loading</div></>);

  if(error) return (<><div>Error</div></>);

  return (
    <>
      <section id="portfolio">
        <div className="wrapper">
          <h1>Portfolio</h1>

          <div className="content">
            <PortfolioItem items={data} />
          </div>
        </div>
      </section>
    </>
  )
}

export default PortfolioGallery;
