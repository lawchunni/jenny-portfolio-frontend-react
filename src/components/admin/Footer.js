import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer>
        <div className="wrapper">
          <p>Admin | Jenny Web Services</p>
          <p><Link to="/">Go to Customer Version</Link></p>
        </div>
    </footer>
    </>
  )
}

export default Footer;
