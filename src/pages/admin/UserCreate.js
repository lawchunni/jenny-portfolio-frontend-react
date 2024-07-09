import React, { useState } from 'react';
import { postUser } from '../../services/usesApi';

function UserCreate() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState('No');

    const handleSubmit = async (e) => {
      e.preventDefault();

      // post user to server via api
      postUser(email, password, isAdmin);

      setEmail('');
      setPassword('');
      setIsAdmin('no')
    }

  return (
    <>
      <section id="admin_user_add">
        <div className="wrapper">
          <div className="content">
            <h1>Create New User</h1>

            <div className="admin_form">

              <form onSubmit={handleSubmit}  encType="multipart/form-data" noValidate>
                  <p>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={email || ''} onChange={(e) => setEmail(e.target.value)} required />
                    {/* <span className="error">Error</span> */}
                  </p>

                  <p>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password || ''} onChange={(e) => setPassword(e.target.value)} required/>
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
