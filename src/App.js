import Home from './pages/Home';
import './assets/styles/main.scss';
import { useEffect } from 'react';
import Header from './components/Header';

function App() {

  useEffect(() => {
    document.title = "JENNY's Portfolio | Home";
  }, []);
  return (
    <div>
      <div className="App">
        <Header />
        <Home />
      </div>
    </div>
  );
}

export default App;
