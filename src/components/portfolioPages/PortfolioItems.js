import { Link } from "react-router-dom";

/**
 * Reusable portfolio list item 
 * @param {*} param0 database profolio items
 * @returns 
 */
function PortfolioItems ({items}) {
  return items.map((item, index) => {
    return (
      <div key={index} className="item">
        <h2>{ item.title }</h2>
        <div className="thumbnail" style={{backgroundImage: `url(${require('../../assets/images/' + item.thumbnail)})` }}>
          <Link to={`/portfolio-details/${item._id}`}></Link>
          <span className="view">View</span>
          <span className="cover"></span>
        </div>
        <h3>Desc:</h3>
        <p className="desc">{ item.desc_short }</p>
        <div className="portfolio_tag">
          {
            item.tags.map((tagItem, tagIdx) => (
              <span key={tagIdx}>{tagItem}</span>
            ))
          }
        </div>
      </div>
    )
  })
}

export default PortfolioItems;
