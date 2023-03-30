const fetch = require('node-fetch').default;





// add role names to this object to map them to group ids in your AAD tenant
const roleGroupMappings = {
    'admin': '1b9391b1-2ab5-4f91-8b9e-d46d49f6c39f',
    'reader': '33bb071c-118d-40d1-a5d7-7ced5900b973'
};

module.exports = async function (context, req) {
    const user = req.body || {};
    const roles = [];
    
    for (const [role, groupId] of Object.entries(roleGroupMappings)) {
        if (await isUserInGroup(groupId, user.accessToken)) {
            roles.push(role);
        }
    }

    // get role information from req
    // const header = req.headers['x-ms-client-principal'];
    // const encoded = Buffer.from(header, 'base64');
    // const decoded = encoded.toString('ascii');
    // const clientPrincipal = JSON.parse(decoded);

    roles.push("test");
    //roles.push(clientPrincipal.userId);
    roles.push(JSON.stringify(user));
    roles.push("test2");
    

    context.res.json({
        roles
    });
}

async function isUserInGroup(groupId, bearerToken) {
    const url = new URL('https://graph.microsoft.com/v1.0/me/memberOf');
    url.searchParams.append('$filter', `id eq '${groupId}'`);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
    });

    if (response.status !== 200) {
        return false;
    }

    const graphResponse = await response.json();
    const matchingGroups = graphResponse.value.filter(group => group.id === groupId);
    return matchingGroups.length > 0;
}