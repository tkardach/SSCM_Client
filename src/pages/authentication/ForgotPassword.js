import './Authentication.css';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../../services/authentication";


const ForgotPassword = ({gotoLoginPage}) => {
  gotoLoginPage = gotoLoginPage && typeof gotoLoginPage === 'function' ? gotoLoginPage : () => {};

  const [serverError, setServerError] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async data => {
    await forgotPassword(data.email)
      .then(async data => {
        if (data.status === 200) {
          setServerError('');
          setSuccessMessage('Email has been sent');
          return;
        }
        
        // Received a server error, handle accordingly
        setServerError(await data.text());
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="authentication-container">
      <div className="authentication-image" />
      <form className="authentication-form text-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input 
            name="email"
            type="email"
            className="form-control" 
            placeholder="Email" 
            {...register("email", {required: true})}/>
          {errors.email && <p>Email is required</p>}
          {serverError && <p>{serverError}</p>}
          {successMessage && <p>{successMessage}</p>}
        </div>
        <div className="text-right">
          <div className="font-weight-light d-inline-block text-left">
            <p>
              Ready to login?
              <a href="#!" className="ml-1" onClick={gotoLoginPage}>Login</a>
            </p>
          </div>
          <br></br>
        </div>
        <button type="submit" className="btn sscm-primary mb-4">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;