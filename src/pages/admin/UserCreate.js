import React, { useState } from 'react';
import { createUserApi} from '../../services/userApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTokenValidation } from '../../hooks/useTokenValidation';
import { useLogout } from '../../hooks/useLogout';

function UserCreate() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState('No');

    const { getRefreshToken } = useAuth();
    const { validateAndFetchData } = useTokenValidation();
    const  logoutFromServer  = useLogout();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      
      formData.append('username', username);
      formData.append('password', password);
      formData.append('isAdmin', isAdmin);

      try {
        const sendFormToServer = await validateAndFetchData({
          fetchDataFunc: createUserApi, 
          type: 'CREATE',
          data: formData
        });  // post user to server via api
        
        if (sendFormToServer) {
          navigate("../admin/user-list");
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

        setUsername('');
        setPassword('');
        setIsAdmin('no');

      } catch (err) {
        alert('Error: ' + err.message);
      }
    }

  return (
    <>
      <section id="admin_user_add">
        <div className="wrapper">
          <div className="content">
            <h1>Create New User</h1>

            <div className="admin_form">

              <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
                  <p>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)} required />
                    {/* <span className="error">Error</span> */}
                  </p>

                  <p>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} required/>
                    {/* <span className="error">Error</span> */}
                  </p>
                  
                  <p>
                    <label htmlFor="isadmin">Admin?</label>
                    <select id="isadmin" defaultValue="no" onChange={(e) => setIsAdmin(e.target.value)}>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </p>

                  <p className="action_btn submit_btn">
                    <button className="add_btn" type="submit">Submit</button>
                  </p>
                </form>
    
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default UserCreate;
