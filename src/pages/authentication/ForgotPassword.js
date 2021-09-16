import './Authentication.css';
import React from 'react';
import { useForm } from "react-hook-form";


const ForgotPassword = ({gotoLoginPage}) => {
  gotoLoginPage = gotoLoginPage && typeof gotoLoginPage === 'function' ? gotoLoginPage : () => {};

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = () => {
    console.log("Submitted password reset")
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