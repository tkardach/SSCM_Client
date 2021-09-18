import React from 'react';
import './App.css';
import Authentication from './pages/authentication/Authentication';
import Profile from './pages/profile/Profile';
import useToken from './services/token';

function App() {
  const {token, setToken} = useToken();

  localStorage.setItem('token', null);

  if (!token) {
    return (
      <div className="App-Mobile">
        <div className="mt-5">
          <Authentication setToken={setToken}/>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Profile />
    </div>
  );
}

export default App;
