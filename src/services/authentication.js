export function login(credentials) {
  return fetch(process.env.REACT_APP_SSCM_AUTHENTICATE_API + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(credentials)
  })
} 

export function createAccount(credentials) {
  return fetch(process.env.REACT_APP_SSCM_AUTHENTICATE_API + '/create-account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(credentials)
  })
} 

export function logout() {
  return fetch(process.env.REACT_APP_SSCM_AUTHENTICATE_API + '/logout');
} 

export function getJWT() {
  return fetch(process.env.REACT_APP_SSCM_AUTHENTICATE_API + '/jwt')
} 
