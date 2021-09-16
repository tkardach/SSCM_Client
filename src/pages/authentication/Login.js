import './Authentication.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { login } from '../../services/authentication';


const Login = ({setToken, gotoCreateAccountPage, gotoForgotPasswordPage}) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  gotoForgotPasswordPage = gotoForgotPasswordPage && typeof gotoForgotPasswordPage === 'function' ? gotoForgotPasswordPage : () => {};
  gotoCreateAccountPage = gotoCreateAccountPage && typeof gotoCreateAccountPage === 'function' ? gotoCreateAccountPage : () => {};

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await login({
      username,
      password
    });
    setToken(token);
  }

  return (
    <div className="authentication-container">
      <div className="authentication-image"/>
      <form className="authentication-form text-center" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Email" onChange={e => setUserName(e.target.value)}/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
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