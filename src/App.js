import { useEffect } from 'react';
import './assets/styles/main.scss';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
// import Contact from './pages/Contact';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PortfolioDetails from './pages/PortfolioDetails';
import ScrollToTop from './components/common/ScrollToTop';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import CommonLayout from './layouts/CommonLayout';
import AdminLayout from './layouts/AdminLayout';

function App() {
  useEffect(() => {
    document.title = "JENNY's Portfolio | Home";
  }, []);

  return (
    <>
      <div className="App">
        <Router>
          <ScrollToTop />
          
          <Routes>
            {/* Common */}
            <Route path="/" element={<CommonLayout><Home /></CommonLayout>} />
            <Route path="/portfolio" element={<CommonLayout><Portfolio /></CommonLayout> } />
            <Route path="/portfolio-details/:id" element={<CommonLayout><PortfolioDetails /></CommonLayout>} />
            {/* <Route path="/contact" element={<Contact /> } /> */}
            <Route path="/login" element={<CommonLayout><Login /></CommonLayout>} />
            <Route path="*" element={<CommonLayout><PageNotFound /></CommonLayout>} />
            
          </Routes>
        </Router>
       
      </div>
    </>
  );
}

export default App;
