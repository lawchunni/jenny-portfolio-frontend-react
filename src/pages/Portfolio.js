import PortfolioGallery from '../components/portfolioPages/PortfolioGallery';
import { PortfolioContextProvider } from '../contexts/PortfolioContext';

function Portfolio() {
  return (
    <PortfolioContextProvider>
      <PortfolioGallery />
    </PortfolioContextProvider>
  )
}

export default Portfolio;
