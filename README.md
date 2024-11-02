# Azure Static Web Apps custom roles sample

See [this tutorial](https://docs.microsoft.com/azure/static-web-apps/assign-roles-microsoft-graph) for more details.

Test : https://proud-ground-0250abc00.5.azurestaticapps.net

## Note
- If deployment failed, check workflow.yml to see if `uses: Azure/static-web-apps-deploy@v2` set to v2
- Update GetRoles for custom role usage
- For 500 errors, try to test it from local, navigate to api folder and run "func start" test firstly
- api/package.json, remove '"type": "module",' for Node 20 + 
- Test login with out Logout `Clean up the cookie`