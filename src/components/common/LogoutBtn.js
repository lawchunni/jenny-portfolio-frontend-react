import { useAuth } from "../../contexts/AuthContext";

// Button to logout users
const LogoutBtn = ({display = true}) => {

  const { logout } = useAuth();

  if(display) {
    return (
      <button className="logout_btn" title="logout" onClick={logout}>Logout</button>
    )
  }
}

export default LogoutBtn;
