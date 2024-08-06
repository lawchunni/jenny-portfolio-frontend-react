import { useParams } from 'react-router-dom';
import { SelectedPortfolioContextProvider } from '../contexts/SelectedPortfolioContext';
import PortfolioItem from '../components/portfolioPages/PortfolioItem';

function PortfolioDetails() {
  const portfolioId = useParams();

  return (
    <SelectedPortfolioContextProvider path="portfolio">
      <section id="portfolio_details">
        <div className="wrapper">
          <PortfolioItem id={portfolioId.id} />
        </div>
      </section>
    </SelectedPortfolioContextProvider>
  )
}

export default PortfolioDetails;
