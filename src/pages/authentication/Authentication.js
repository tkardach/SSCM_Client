import './Authentication.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import CreateAccount from './CreateAccount';
import ForgotPassword from './ForgotPassword';


const AuthPageState = Object.freeze({"login_page": 0, "create_account_page": 1, "forgot_password_page": 2});

const Authentication = ({setToken}) => {
  const [pageState, setPageState] = useState(AuthPageState.login_page);

  const onGotoLoginPage = () => {
    setPageState(AuthPageState.login_page);
  }

  const onGotoCreateAccountPage = () => {
    setPageState(AuthPageState.create_account_page);
  }

  const onGotoForgotPasswordPage = () => {
    setPageState(AuthPageState.forgot_password_page);
  }

  return (
    pageState === AuthPageState.login_page ? 
      <Login 
        setToken={setToken} 
        gotoCreateAccountPage={onGotoCreateAccountPage} 
        gotoForgotPasswordPage={onGotoForgotPasswordPage}/> :
    pageState === AuthPageState.create_account_page ? 
      <CreateAccount 
        setToken={setToken} 
        gotoLoginPage={onGotoLoginPage}/> :
    pageState === AuthPageState.forgot_password_page ? 
      <ForgotPassword 
        gotoLoginPage={onGotoLoginPage}/> : <div></div>
  );
};

Authentication.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Authentication;