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

export function forgotPassword(email) {
  const content = {email: email}
  return fetch(process.env.REACT_APP_SSCM_AUTHENTICATE_API + '/forgot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(content)
  })
}

export function getJWT() {
  return fetch(process.env.REACT_APP_SSCM_AUTHENTICATE_API + '/jwt')
} 
