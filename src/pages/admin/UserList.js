import { Link } from "react-router-dom";
import { deleteUserApi, fetchUsersFromApi } from "../../services/userApi";
import { useCallback, useEffect, useState } from "react";
import { useTokenValidation } from "../../hooks/useTokenValidation";
import { useLogout } from "../../hooks/useLogout";
import { useAuth } from "../../contexts/AuthContext";

function UserList() {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { accessToken, getRefreshToken } = useAuth();
  const  logoutFromServer  = useLogout();
  const { validateAndFetchData } = useTokenValidation();

   // Func to fet user list from server
   const fetchData = useCallback( async () => {
    try {
      setError(false);
  
      // validate the token before fetching the data 
      const fetchedData = await validateAndFetchData({fetchDataFunc: fetchUsersFromApi});

      if (fetchedData) {
        setData(fetchedData);
      } else {
        // only logout user when refresh token is missing
        if (!getRefreshToken()) {
          const handleLogout = async () => {
            await logoutFromServer();
          }
          handleLogout();
          return;
        }
        
      }
      
    } catch (err) {
      setError(true);
      console.error('Failed to load portfolio:', err);
    }
  }, [ validateAndFetchData, logoutFromServer, getRefreshToken]);


  useEffect(() => {
  
    fetchData();
  
  }, [accessToken, fetchData]);

  // Action to hanle single user delete
  const handleDeleteUser = (id) => {

    if (!id) return;

    const deleteUser = async() => {
      const result = await validateAndFetchData({
        fetchDataFunc: deleteUserApi,
        id: id
      });

      if (result) {
        fetchData();
      }
    }

    deleteUser();

  };

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
                <div className="col col-2">&nbsp;</div>
              </div>
              {
                data.map((item, index) => {
                  return (
                    <div className="row" key={index}>
                      <div className="col col-4">{item?._id}</div>
                      <div className="col col-4">{item?.username}</div>
                      <div className="col col-2">{item?.isAdmin}</div>
                      <div className="col col-2">
                        <button className="delete_btn" onClick={() => handleDeleteUser(item?._id)}>Delete</button>
                      </div>
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

export default UserList;
