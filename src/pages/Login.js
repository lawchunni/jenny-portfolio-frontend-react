import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { loginApi } from "../services/authApi";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DOMPurify from "dompurify";

const Login = () => {

  const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
  })

  const [error, setError] = useState(null);
  const { login } = useAuth();

  // apply form validation and handle submit
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {

    const username = DOMPurify.sanitize(data.username);
    const password = DOMPurify.sanitize(data.password);

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
  };

  return (
    <>
      <section id="login" className="login_form">
        <div className="wrapper">
          <div className="content">
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <p className="field required">
                <input 
                  type="text" 
                  name="username" 
                  placeholder="Username" 
                  {...register('username')} />

                {errors.username && <span className="error">{errors.username?.message}</span>}
              </p>
              <p className="field required">
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  {...register('password')} />

                {errors.password && <span className="error">{errors.password?.message}</span>}
              </p>
              <p>
                <button className="submit_button">Submit</button>
              </p>
            </form>
          </div>
      </div>
    </section>
    </>
  )
}

export default Login;
