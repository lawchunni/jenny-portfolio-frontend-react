import { useContext, useEffect } from "react";
import { SelectedPortfolioContext } from "../../contexts/SelectedPortfolioContext";
import Loading from "../common/Loading";
import Error from "../common/Error";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function PortfolioItem ({id}) {
  const { data, loading, error, updateId } = useContext(SelectedPortfolioContext);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  useEffect(() => {
    if (id) {
      updateId(id);
    }
  });

  if (loading) return (<><Loading /></>);

  if (error) return (<><Error /></>);

  return (
    <>
      <h1>{ data?.title }</h1>

      <div className="content">
        <div className="desc">
          <h2>Description</h2>
          <div className="portfolio_tag">
            {data?.tags.split('|').map((item, index) => {
              return (
                <span key={index}>{item}</span>
              )
            })}
            
          </div>
          <p>{ data?.desc_long }</p>
        </div>
        
        <div className="thumbnails">
          <Carousel 
            responsive={responsive}
            draggable={false}
            showDots={true}
            infinite={true}
            dotListClass="portfolio-dot-list-style"
          >
            {
              data?.images.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    <img key={index} src={ `http://127.0.0.1:4000${item}`} alt="img desc" />
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        
      </div>
    </>
  )
}

export default PortfolioItem;