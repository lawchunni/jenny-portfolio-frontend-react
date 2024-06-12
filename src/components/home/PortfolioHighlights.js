import { useContext } from "react"
import { PortfolioContext } from "../../contexts/PortfolioContext"
import Loading from "../common/Loading";
import Error from "../common/Error";
import { Link } from "react-router-dom";


function PortfolioHighlights() {

  const { data, loading, error } = useContext(PortfolioContext);

  if (loading) return (<><Loading /></>);

  if (error) return (<><Error /></>);
  
  return (
    <>
    <div className="flex">
    {
        data.map((item, index) => {
          if (item.highlight) {
            return (
              <div key={index} className="item">
                <div className="circle_icon">
                  <Link to={`/portfolio-details/${item._id}`} className="circle"></Link>
                  <Link to={`/portfolio-details/${item._id}`}><img className="work-icon" src={ require('../../assets/images/' + item.thumbnail) } alt={ item.thumbnail } width={145} height={93} /></Link>
                  
                  <img className="shadow" src={ require('../../assets/images/blurry-shadow.png') } alt="blurry shadow" width={60} height={24} />
                </div>
                <div className="info">
                  <div className="title">
                    <Link to={`/portfolio-details/${item._id}`}>{ item.title }</Link>
                  </div>
                  <p>{ item.desc_short }</p>
                </div>
              </div>
            )
          }
        })
      }
    </div>
      
    </>
  )
}

export default PortfolioHighlights;
