import React, { useState } from 'react';
import './App.css';
import Authentication from './pages/authentication/Authentication';
import Profile from './pages/authentication/Profile';
import PoolUsageChart from './pages/pool-usage/PoolUsageChart';
import { useToken } from './services/token';
import { useMediaQuery } from 'react-responsive';
import { isMobileQuery } from './services/device';
import Sidebar from './components/side-bar/SideBar';


function App() {
  const {token, setToken, removeToken} = useToken();
  const [hideSidebar, setHideSidebar] = useState(false);

  localStorage.setItem('token', null);

  const isMobile = useMediaQuery({query: isMobileQuery});

  const onToggleHide = (hidden) => {
    setHideSidebar(hidden);
  }

  const chartStyle = {
    width: "auto",
    height: "40%",
    margin: "20% 15%"
  }

  return (
    <div>
      <div className="App">
        <div 
          className={"account-navigation " + 
            (hideSidebar ? "account-navigation-hidden animateTransitionLeft" : "animateTransitionRight")}>
          <Sidebar 
            hideSidebar={hideSidebar}
            onToggleCollapse={onToggleHide}>
            <div className="app-sidebar-content">
              <div className={"mt-5 " + 
                (hideSidebar && isMobile ? "app-sidebar-hide-content " : "")}>
                {!token &&
                  <Authentication setToken={setToken}/>
                }
                {token &&
                  <Profile removeToken={removeToken} />
                }
              </div>
            </div>
          </Sidebar>
        </div>
        <div className={"profile-navigation " + (hideSidebar ? "profile-navigation-expanded" : "")}>
          <PoolUsageChart chartStyle={chartStyle}/>
        </div>
      </div>
    </div>
  );
}

export default App;
