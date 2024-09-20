import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { loginApi } from "../services/authApi";

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const verifyUserOnServer = async () => {

      try {
        const data = await loginApi(username, password);
        await login(data);
        setError(false);
      } catch (err) {
        setError(true);
      }
    }

    verifyUserOnServer();

    setUsername('');
    setPassword('');
  };

  return (
    <>
      <section id="login" className="login_form">
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
