import { Link, useLocation } from "react-router-dom";
import LogoutBtn from "../common/LogoutBtn";
import { useEffect, useState } from "react";

function Item({displayName, path, route}) {
  return (
    <Link 
      className={`${ path === route ? 'active' : ''}`}
      to={route} 
      title={displayName}
    >{displayName}</Link>
  )
}

function Sidebar() {
  const [ path, setPath ] = useState('');
  const getPath = useLocation().pathname;

  useEffect(() => {
    if(getPath) {
      setPath(getPath);
    }
  }, [getPath]);

  return (
    <>
      <header>
        <div className="wrapper">

          {/* <!-- Logo --> */}
          <div id="logo">
            <Link to="/admin/portfolio-list" title="Portfolio List">
              <img src="/images/logo-admin.svg" alt="logo admin" width="116" height="42" />
            </Link>
          </div>

          {/* <!-- Navigation menu --> */}
          <nav>
            {/* <!-- hamburger icon: mobile only --> */}
            <a href=":javascript;" id="hamburger" title="hamburger icon">
              <span></span>
              <span></span>
              <span></span>
            </a>

            {/* <!-- nav menu list: desktop only --> */}
            <ul>
              <li>
                <Item displayName="Portfolio List" path={path} route="/admin/portfolio-list" />
              </li>

              <li>
                <Item displayName="User" path={path} route="/admin/user-list" />
              </li>

              <li>
                <Item displayName="Traffic" path={path} route="/admin/traffic" />
              </li>

            </ul>
          </nav>

          <div className="static_site">
            <Item displayName="Customer Site" path={path} route="/" />
          </div>

          {/* <!-- Logout button --> */}
          <LogoutBtn />
            
        </div>
    </header>
    </>
  )
}

export default Sidebar;
