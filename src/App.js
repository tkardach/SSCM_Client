import React from 'react';
import './App.css';
import Authentication from './pages/authentication/Authentication';
import Profile from './pages/profile/Profile';
import useToken from './services/token';
import NavBar from './components/nav-bar/NavBar';
import { useMediaQuery } from 'react-responsive';
import { isMobileQuery } from './services/device';


function App() {
  const {token, setToken} = useToken();

  localStorage.setItem('token', null);

  const isMobile = useMediaQuery({query: isMobileQuery});

  const chartStyle = {
    width: "80%",
    height: "60%",
    marginTop: "20%"
  }

  return (
    <div>
      {(!token && isMobile) && 
        <div className="App-Mobile">
          <div className="mt-5">
            <Authentication setToken={setToken}/>
          </div>
        </div>
      }
      <div className="App">
        <NavBar />
        <Profile chartStyle={chartStyle}/>
      </div>
    </div>
  );
}

export default App;
