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
                  <a className="Home" href="/" title="Home">Home</a>
                </li>
                <li>
                  <a className="Portfolio" href="portfolio" title="Portfolio">Portfolio</a>
                </li>
                <li>
                  <a className="Contact" href="contact-me" title="Contact me">Contact Me</a>
                </li>

                { /* TODO::  Login/Login logic */ }
                <li>
                  <a className="login_btn" href="/login" title="Login">Login</a>
                </li>
                <li>
                  <a href="/admin" title="Dashboard">Logout</a>
                </li>
                { /* TODO::  if admin ----->>>> show admin */ }
                <li>
                  <a href="/admin" title="Dashboard">Admin</a>
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