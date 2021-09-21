import "./Authentication.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { createAccount } from "../../services/authentication";


const CreateAccount = ({setToken, gotoLoginPage}) => {
  gotoLoginPage = gotoLoginPage && typeof gotoLoginPage === "function" ? gotoLoginPage : () => {};

  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState();
  
  const onSubmit = async data => {
    const token = await createAccount({
      email: data.email,
      password: data.password
    })
    .then(async data => {
      if (data.status === 201) {
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
        <div className="form-group">
          <input 
            name="password"
            type="password"
            className="form-control" 
            placeholder="Password" 
            {...register("password", {required: true})} />
          {errors.password && <p>Password is required</p>}
        </div>
        <div className="form-group">
          <input 
            name="passwordCopy"
            type="password"
            className="form-control" 
            placeholder="Re-enter Password" 
            {...register("passwordCopy", {
              validate: {
                passwordMatch: value => value === getValues().password
              }
            })}/>
          {errors.passwordCopy?.type === "passwordMatch" && <p>Passwords do not match</p>}
          {serverError && <p>{serverError}</p>}
        </div>
        <div className="text-right">
          <div className="font-weight-light d-inline-block text-left">
            <p>
              Already have an account?
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

CreateAccount.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default CreateAccount;