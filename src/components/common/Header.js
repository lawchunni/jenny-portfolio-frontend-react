import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LogoutBtn from './LogoutBtn';

// Header Items
function Item({name, path, route, extraClassName = '', display = true}) {
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  if (display) {
    return (
      <li>
        <Link 
          className={`${ name } ${extraClassName} ${ path === name ? 'active' : ''}`} 
          to={ route } 
          title={ name }
        >{ displayName }</Link>
      </li>
    )
  }
}

function Header() {
  const [ path, setPath ] = useState('');
  const location = useLocation();
  const getPath = location?.pathname;
  const { auth } = useAuth(); 

  useEffect(() => {
    if (getPath) {
      const activePath = getPath === '/' ? 'home' : getPath.replace(/\//g, '');

      setPath(activePath);
    }
  }, [getPath]);

  return (
    <>
      { /*Navigation menu with logo */ }
      <header>
        <div className="wrapper">
          <div className="flex-header">
            { /*Logo */ }
            <div id="logo">
              <a href="/" title="Home">
                <img src="/images/logo.svg" alt="logo" width="116" height="42" />
              </a>
            </div>

            { /*Navigation menu */ }
            <nav>
              { /*hamburger icon: (mobile only) */ }
              <a href=":javascript;" id="hamburger" title="hamburger icon">
                <span></span>
                <span></span>
                <span></span>
              </a>

              { /*nav menu list: desktop only */ }
              <ul> 

                <Item name="home" path={path} route="/" />

                <Item name="portfolio" path={path} route="/portfolio" />

                <Item name="login" path={path} route="/login" extraClassName="login_btn" display={!auth} />

                <Item name="admin" path={path} route="/admin/portfolio-list" extraClassName="admin_btn" display={auth} />

                 {/* <!-- Logout button --> */}
                <li>
                  <LogoutBtn display={auth} />
                </li>

              </ul>
            </nav>
            
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;