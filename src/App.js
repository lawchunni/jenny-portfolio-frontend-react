import { useEffect } from 'react';
import './assets/styles/main.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


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
          </Routes>
        </Router>
        <Footer />
      </div>
    </>
  );
}

export default App;
