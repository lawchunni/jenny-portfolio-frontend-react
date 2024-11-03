import { Link } from "react-router-dom";
import config from "../../config";

/**
 * Reusable portfolio list item 
 * @param {*} param0 database profolio items
 * @returns 
 */
function PortfolioItems ({items}) {
  return items.map((item, index) => {
    if (!item.deleted) {
      return (
        <div key={index} className="item">
          <h2>{ item?.title }</h2>
          <div className="thumbnail" style={{backgroundImage: `url('${config.appBaseUrl + item?.thumbnail}')` }}>
            <Link to={`/portfolio-details/${item?._id}`}></Link>
            <span className="view">View</span>
            <span className="cover"></span>
          </div>
          <h3>Desc:</h3>
          <p className="desc">{ item?.desc_short }</p>
          <div className="portfolio_tag">
            {
              item?.tags.split('|').map((tagItem, tagIdx) => (
                <span key={tagIdx}>{tagItem}</span>
              ))
            }
          </div>
        </div>
      )
    } else {
      return null;
    }
  })
}

export default PortfolioItems;
