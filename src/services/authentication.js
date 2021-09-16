export async function login(credentials) {
  return fetch(process.env.REACT_APP_SSCM_AUTHENTICATE_API + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
} 

export async function createAccount(credentials) {
  return fetch(process.env.REACT_APP_SSCM_AUTHENTICATE_API + '/create-account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
} 