import "./Authentication.css";
import React from "react";
import PropTypes from "prop-types";
import { logout } from "../../services/authentication";


const Profile = ({removeToken}) => {
  const onSignOut = () => {
    logout()
      .catch(err => console.log("Error occured while logging out"))

    removeToken();
  }

  return (
    <div className="authentication-container">
      <div className="authentication-image"/>
      <button className="btn sscm-primary mb-4 mt-5" onClick={onSignOut}>Sign Out</button>
    </div>
  );
};

Profile.propTypes = {
  removeToken: PropTypes.func.isRequired
}

export default Profile;