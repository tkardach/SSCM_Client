import { getJWT } from './authentication';

export function getToken() {
  return getJWT()
    .then(data => {
      if (data.status === 200)
        return data.json();
      
      return '';
    })
    .catch(err => {
      console.log(err);
      return '';
    })
}