import './Profile.css';
import React from 'react';
import ColumnChart from '../../components/charts/ColumnChart';


const Profile = () => {
  const chartStyle = {
    width: "80%",
    height: "60vh",
    margin: "auto"
  }

  return (
    <div className="profile-container">
      <ColumnChart chartStyle={chartStyle}/>
    </div>
  );
};

export default Profile;