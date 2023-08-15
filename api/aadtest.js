const fetch = require('node-fetch').default;

var bearerToken = "xxx"


const url = new URL("https://graph.microsoft.com/v1.0/me/appRoleAssignments");
const response = fetch(url, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${bearerToken}`
    }
})


response.then(res=>{
  console.log(res.json())
})