import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import { useEffect, useState } from 'react';

function Header() {

  const [ path, setPath ] = useState('');

  const location = useLocation();
  const pathName = location?.pathname;
  const active = 'active';
  
  useEffect(() => {
    
    if (pathName) {
      const activePath = pathName === '/' ? 'home' : pathName.replace(/\//g, '');
      setPath(activePath);
    }
    
  }, [location]);

  return (
    <>
      { /*Navigation menu with logo */ }
      <header>
        <div className="wrapper">
          <div className="flex-header">
            { /*Logo */ }
            <div id="logo">
              <a href="/" title="Home">
                <img src={ logo } alt="logo" width={116} height={42} />
              </a>
            </div>
            { /*Navigation menu */ }
            <nav>
              { /*hamburger icon: mobile only */ }
              <a href="#" id="hamburger" title="hamburger icon">
                <span></span>
                <span></span>
                <span></span>
              </a>

              { /*nav menu list: desktop only */ }
              <ul> 
                <li>
                  <Link className={`home ${path === 'home' ? active : ''}`} to="/" title="Home">Home</Link>
                </li>
                <li>
                  <Link className={`portfolio ${path === 'portfolio' ? active : ''}`} to="portfolio" title="Portfolio">Portfolio</Link>
                </li>
                <li>
                  <Link className={`contact ${path === 'contact' ? active : ''}`} to="/contact" title="Contact">Contact Me</Link>
                </li>

                { /* TODO::  Login/Login logic */ }
                <li>
                  <Link className="login_btn" to="/login" title="Login">Login</Link>
                </li>
                <li>
                  <Link to="/logout" title="Dashboard">Logout</Link>
                </li>
                { /* TODO::  if admin ----->>>> show admin */ }
                <li>
                  <Link className={path === 'admin' ? active : ''} to="/admin" title="Dashboard">Admin</Link>
                </li>
                
              </ul>

              { /*Search Box */ }
            </nav>
            
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;