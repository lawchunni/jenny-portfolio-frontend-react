import { useEffect } from 'react';
import './assets/styles/main.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PortfolioDetails from './pages/PortfolioDetails';


function App() {
  useEffect(() => {
    document.title = "JENNY's Portfolio | Home";
  }, []);

  return (
    <>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio /> } />
            <Route path="/portfolio-details/:id" element={<PortfolioDetails />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </>
  );
}

export default App;
