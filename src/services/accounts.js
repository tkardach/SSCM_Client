export async function getUserAccount() {
  return fetch(process.env.REACT_APP_SSCM_ACCOUNTS_API + '/my-account');
}
