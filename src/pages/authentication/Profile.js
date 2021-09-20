import "./Authentication.css";
import React from "react";
import PropTypes from "prop-types";


const Profile = ({removeToken}) => {
  const onSignOut = () => {
    removeToken();
  }

  return (
    <div className="authentication-container">
      <div className="authentication-image"/>
      <button className="btn sscm-primary mb-4" onClick={onSignOut}>Sign Out</button>
    </div>
  );
};

Profile.propTypes = {
  removeToken: PropTypes.func.isRequired
}

export default Profile;