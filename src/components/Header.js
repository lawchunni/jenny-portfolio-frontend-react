import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

function Header() {
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
                  <Link className="home" to="/" title="Home">Home</Link>
                </li>
                <li>
                  <Link className="portfolio" to="portfolio" title="Portfolio">Portfolio</Link>
                </li>
                <li>
                  <Link className="contact" to="/contact-me" title="Contact me">Contact Me</Link>
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
                  <Link to="/admin" title="Dashboard">Admin</Link>
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