import "./Authentication.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { login } from "../../services/authentication";


const Login = ({setToken, gotoCreateAccountPage, gotoForgotPasswordPage}) => {
  gotoForgotPasswordPage = gotoForgotPasswordPage && typeof gotoForgotPasswordPage === "function" ? gotoForgotPasswordPage : () => {};
  gotoCreateAccountPage = gotoCreateAccountPage && typeof gotoCreateAccountPage === "function" ? gotoCreateAccountPage : () => {};

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState();

  const onSubmit = async data => {
    const token = await login({
      email: data.email,
      password: data.password
    })
    .then(async data => {
      if (data.status === 200) {
        setServerError('');
        return data.json();
      }
      
      // Received a server error, handle accordingly
      setServerError(await data.text());
      return undefined
    })
    .catch(err => console.log(err));
    
    if (token)
      setToken(token);
  }

  return (
    <div className="authentication-container">
      <div className="authentication-image"/>
      <form className="authentication-form text-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input 
            name="email"
            type="email"
            className="form-control" 
            placeholder="Email" 
            {...register("email", {required: true})}/>
          {errors.email && <p>Email is required</p>}
        </div>
        <div className="form-group">
          <input 
            name="password"
            type="password"
            className="form-control" 
            placeholder="Password" 
            {...register("password", {required: true})} />
          {errors.password && <p>Password is required</p>}
          {serverError && <p>{serverError}</p>}
        </div>
        <div className="text-right">
          <div className="font-weight-light d-inline-block text-left">
            <p>
              <a href="#!" onClick={gotoForgotPasswordPage}>Forgot Password?</a>
            </p>
            <p>
              Or
              <a href="#!" className="ml-1" onClick={gotoCreateAccountPage}>Create Account</a>
            </p>
          </div>
          <br></br>
        </div>
        <button type="submit" className="btn sscm-primary mb-4">Submit</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;