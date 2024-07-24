import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://127.0.0.1:4000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password })
      });

      const data = await res.json();
  
      if(res.ok) {
        await login(data);
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Login failed: ' + err.message);
    }

    setUsername('');
    setPassword('');
  };

  return (
    <>
      <section id="login" className="submit_form">
        <div className="wrapper">
          <div className="content">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} noValidate>
              <p className="field required">
                <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                {/* Add escape to 'value' */}
                  {/* <span className="error"><?=$utils->esc($errors['email'][0] ?? '') ?></span> */}
              </p>
              <p className="field required">
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                {/* <span className="error"><?=$utils->esc($errors['password'][0] ?? '') ?></span> */}
              </p>
              <p>
                <button className="submit_button">Submit</button>
              </p>
            </form>
            {/* <div className="forget_password"><a href="#">Forget Password?</a></div> */}
          </div>
      </div>
    </section>
    </>
  )
}

export default Login;
