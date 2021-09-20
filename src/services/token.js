import { useState } from 'react';

export function getToken() {
  if (!sessionStorage.getItem('token'))
    return "";
  
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

export function useToken() {
  const [token, setToken] = useState(getToken());

  const removeToken = () => {
    sessionStorage.removeItem('token');
    setToken('');
  }

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    removeToken: removeToken,
    setToken: saveToken,
    token
  }
}