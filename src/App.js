import { useEffect } from 'react';
import './assets/styles/main.scss';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PortfolioDetails from './pages/PortfolioDetails';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  useEffect(() => {
    document.title = "JENNY's Portfolio | Home";
  }, []);

  return (
    <>
      <div className="App">
        <Router>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio /> } />
            <Route path="/portfolio-details/:id" element={<PortfolioDetails />} />
            <Route path="/contact" element={<Contact /> } />
          </Routes>
        </Router>
        <Footer />
      </div>
    </>
  );
}

export default App;
