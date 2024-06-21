import { React } from 'react';
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <>
      <section style={{ textAlign: 'center', color: '#fff'}}>
        <h1>Opps! Page not Found.</h1>
        <p>The page you are looking for does not exist.</p>
        <Link className="button" to="/">Go To Home</Link>
      </section>
    </>
  );
}

export default PageNotFound;
