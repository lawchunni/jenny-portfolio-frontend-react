import { useParams } from 'react-router-dom';

function PortfolioDetails() {
  let portfolioId = useParams();

  return (
    <>
      <section id="portfolio_details">
        <div className="wrapper">
          <h1>{ portfolioId.id }</h1>

          <div className="content">
            <div className="desc">
              <h2>Description</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adip. Lorem ipsum dolor sit amet, consectetur adip. Lorem ipsum dolor sit amet, consectetur adip. </p>
              <p>Lorem ipsum dolor sit amet, consectetur adip. Lorem ipsum dolor sit amet, consectetur adip. Lorem ipsum dolor sit amet, consectetur adip. </p>
              <p>Lorem ipsum dolor sit amet, consectetur adip. Lorem ipsum dolor sit amet, consectetur adip. Lorem ipsum dolor sit amet, consectetur adip. </p>
            </div>
            
            <div className="thumbnails">
              <img src={ require('../assets/images/Launch-Website.png')} alt="img desc" />
              <img src={ require('../assets/images/portfolio-01-thumbnail.jpg')} alt="img desc" />
              <img src={ require('../assets/images/UX-Mockup.png')} alt="img desc" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PortfolioDetails;
