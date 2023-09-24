import Home from './pages/Home';
import './assets/styles/main.scss';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  useEffect(() => {
    document.title = "JENNY's Portfolio | Home";
  }, []);
  return (
    <>
      <div className="App">
        <Header />
        <Home />
        <Footer />
      </div>
    </>
  );
}

export default App;
