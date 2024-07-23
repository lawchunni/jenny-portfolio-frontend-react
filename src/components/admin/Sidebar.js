import { Link } from "react-router-dom";
import LogoutBtn from "../common/LogoutBtn";
import { useAuth } from "../../contexts/AuthContext";

function Sidebar() {

  const { auth } = useAuth();

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
                <Link to="/admin/portfolio-list" title="Portfolio List">Portfolio List</Link>
              </li>

              <li>
                <Link to="/admin/user-list" title="User">User</Link>
              </li>

              <li>
                <Link to="/admin/traffic" title="Traffic">Traffic</Link>
              </li>

            </ul>
          </nav>

          <div className="static_site">
            <Link to="/" title="Customer Site">Customer Site</Link>
          </div>

          {/* <!-- Logout button --> */}
          <LogoutBtn />
            
        </div>
    </header>
    </>
  )
}

export default Sidebar;
