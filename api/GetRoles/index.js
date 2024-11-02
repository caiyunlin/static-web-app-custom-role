const fetch = require('node-fetch').default;



const roleAppRoleMapping = {
    'admin' : '32e048a8-d3ec-46e3-a96a-5dbb35973cfc'
}

module.exports = async function (context, req) {
    const user = req.body || {};
    const roles = [];
    
    // for (const [role, groupId] of Object.entries(roleGroupMappings)) {
    //     if (await isUserInGroup(groupId, user.accessToken)) {
    //         roles.push(role);
    //     }
    // }
   

     roles.push("testRole1"); // output test role for testing
     //roles.push(btoa(JSON.stringify(user)));
     roles.push(user.accessToken); // output accessToken to role for testing
     //roles.push(user.email);
     roles.push("testRole2");

    // for (const [role, groupId] of Object.entries(roleAppRoleMapping)) {
    //     if (await isUserInRole(groupId, user.accessToken)) {
    //         roles.push(role);
    //     }
    // }
    

    context.res.json({
        roles
    });
}



async function isUserInRole(roleId, bearerToken){

    
    const url = new URL("https://graph.microsoft.com/v1.0/me/appRoleAssignments");
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        }
    })
    if(response.status !== 200){
        return false;
    }
    /* Response Sample
    {
        "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users('9af537c7-a986-42e0-826a-c5ba8aac61f3')/appRoleAssignments",
        "value": [
            {
                "id": "xzf1moap4EKCasW6iqxh8_FtAlrJqkRGv0IRnCzFm7M",
                "deletedDateTime": null,
                "appRoleId": "00000000-0000-0000-0000-000000000000",
                "createdDateTime": "2023-03-30T03:23:39.238284Z",
                "principalDisplayName": "Test User",
                "principalId": "9af537c7-a986-42e0-826a-c5ba8aac61f3",
                "principalType": "User",
                "resourceDisplayName": "MyStaticWebApp",
                "resourceId": "7e9b2dcc-ca12-462d-bb90-9fb10058e557"
            },
            {
                "id": "xzf1moap4EKCasW6iqxh8_NymVi04AFBkAHMLzdpLUE",
                "deletedDateTime": null,
                "appRoleId": "32e048a8-d3ec-46e3-a96a-5dbb35973cfc",
                "createdDateTime": "2023-03-30T03:21:04.5003765Z",
                "principalDisplayName": "Test User",
                "principalId": "9af537c7-a986-42e0-826a-c5ba8aac61f3",
                "principalType": "User",
                "resourceDisplayName": "MyStaticWebApp",
                "resourceId": "7e9b2dcc-ca12-462d-bb90-9fb10058e557"
            }
        ]
    }
    */
    const graphResponse = await response.json();
    const items = graphResponse.value;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if(item.appRoleId == roleId){
            return true;
        }
    }
    return false;
}
