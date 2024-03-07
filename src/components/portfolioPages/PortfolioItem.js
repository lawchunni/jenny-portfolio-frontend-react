import { useContext, useEffect } from "react";
import { SelectedPortfolioContext } from "../../contexts/SelectedPortfolioContext";
import Loading from "../common/Loading";
import Error from "../common/Error";

function PortfolioItem ({id}) {
  const { data, loading, error, updateId } = useContext(SelectedPortfolioContext);

  useEffect(() => {
    if (id) {
      updateId(id);
    }
  });

  if (loading) return (<><Loading /></>);

  if (error) return (<><Error /></>);

  return (
    <>
      <h1>{ data.title }</h1>

      <div className="content">
        <div className="desc">
          <h2>Description</h2>
          <div className="portfolio_tag">
            <span>Test</span>
          </div>
          <p>{ data.desc_long }</p>
        </div>
        
        <div className="thumbnails">
          {
            data.images.map((item, index) => {
              return (
                <img key={index} src={ require(`../../assets/images/${item}`)} alt="img desc" />
              )
            })
          }
        </div>
        
      </div>
    </>
  )
}

export default PortfolioItem;