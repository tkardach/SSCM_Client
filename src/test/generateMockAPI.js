const { Constants } = require('./constants');
const fs = require('fs');

function generateRandomSignin() {
  return {
    id: "",
    ts: (new Date()),
    numberOfMembers: 0,
    numberOfGuests: 0,
    droppedOffKids: 0
  }
}

const routes = {
  "/api/statistics/signins" : "/signins",
  "/api/authentication/login" : "/login"
}

const mock_api = {
  signins: [],
  login: {}
}

/*
  Generate 2 signins for each day of this week, 
  one using the test id, the other using a random id.

  The test ID allows us to test if the "member" signin count
  is working, while the random ID allows us to test the total count
*/
let today = new Date();
today.setMonth(today.getMonth() - 8);

for (let i=0; i<7; i++) {
  var signin = generateRandomSignin();
  var signinMember = generateRandomSignin();

  today.setMonth(today.getMonth() + 1);

  signin.id = "Random";
  signinMember.id = Constants.MemberId;
  
  signin.ts = today.toString();
  signinMember.ts = today.toString();

  signin.numberOfMembers = i * 15 + 5;
  signinMember.numberOfMembers = i * 2 + 1;

  mock_api.signins.push(signin);
  mock_api.signins.push(signinMember);
}

fs.writeFile('src/test/mock_api.json', JSON.stringify(mock_api), (err, result) => {
  if (err) console.log('error', err);
});

fs.writeFile('src/test/mock_api_routes.json', JSON.stringify(routes), (err, result) => {
  if (err) console.log('error', err);
});