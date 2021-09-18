import './Profile.css';
import React from 'react';
import PoolUsageChart from '../../components/pool-usage/PoolUsageChart';


const Profile = () => {
  const chartStyle = {
    width: "80%",
    height: "60vh",
    margin: "auto"
  }

  return (
    <div className="profile-container">
      <PoolUsageChart chartStyle={chartStyle}/>
    </div>
  );
};

export default Profile;