import React, { useState, useEffect } from 'react';
import './App.css';
import Authentication from './pages/authentication/Authentication';
import Profile from './pages/authentication/Profile';
import PoolUsageChart from './pages/pool-usage/PoolUsageChart';
import MemberDues from './pages/member-dues/MemberDues';
import { getToken } from './services/token';
import { useMediaQuery } from 'react-responsive';
import { isMobileQuery } from './services/device';
import Sidebar from './components/side-bar/SideBar';


function App() {
  const [token, setToken] = useState();
  const [hideSidebar, setHideSidebar] = useState(false);

  // this makes sure the API is called only once to check if logged in
  useEffect(() => {
    async function fetchData() {
      setToken(await getToken());
    }

    fetchData();
  }, []);

  const isMobile = useMediaQuery({query: isMobileQuery});

  const onToggleHide = (hidden) => {
    setHideSidebar(hidden);
  }

  const removeToken = () => {
    setToken('');
  }

  const chartStyle = {
    width: "auto",
    height: "50%",
    margin: "10% 15%"
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
          <MemberDues memberId={token?.member_id} />
          <PoolUsageChart chartStyle={chartStyle} memberId={token?.member_id} />
        </div>
      </div>
    </div>
  );
}

export default App;
