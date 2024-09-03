import { Link, useNavigate } from "react-router-dom";
import { fetchUsersFromApi } from "../../services/userApi";
import { useEffect, useState } from "react";

function User() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        setError(false);
        const fetchedData = await fetchUsersFromApi();
  
        if (!fetchedData) { // Invalid token or failed to fetch data 
          navigate("/", {replace: true});
          return;
        } else {
          setData(fetchedData);
        }
        
      } catch (err) {
        setError(true);
      }
    }

    fetchData();
  
  }, [navigate]);

 

  if (error) {
    return (
      <>
        <section className="section_white">
          <div className="wrapper">
            <div className="content">
              <p>Failed to fetch data...</p>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <section id="admin_users">
        <div className="wrapper">
          <div className="content">

            <h1>User List</h1>

            <div className="action_btn">
              <Link className="add_btn" to="/admin/user-create">Add User</Link>
            </div>

            <div className="view_list">
              <div className="row header">
                <div className="col col-4">ID</div>
                <div className="col col-6">User</div>
                <div className="col col-2">Admin</div>
              </div>
              {
                data.map((item, index) => {
                  return (
                    <div className="row" key={index}>
                      <div className="col col-4">{item?._id}</div>
                      <div className="col col-6">{item?.username}</div>
                      <div className="col col-2">{item?.isAdmin}</div>
                    </div>
                  )
                })
              }
            </div>
            
          </div>
        </div>
      </section>
    </>
  )
}

export default User;
