import { useLogout } from "../../hooks/useLogout";

// Button to logout users
const LogoutBtn = ({display = true}) => {
  const logoutFromServer = useLogout();

  const handleLogout = async () => {

    await logoutFromServer();
  }

  if(display) {
    return (
      <button className="logout_btn" title="logout" onClick={handleLogout}>Logout</button>
    )
  }
}

export default LogoutBtn;
