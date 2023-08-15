module.exports = async function (context, req) {
  const header = req.headers['x-ms-client-principal'];
  const encoded = Buffer.from(header, 'base64');
  const decoded = encoded.toString('ascii');

  const user = req.body || {};

  context.res = {
    body: {
      clientPrincipal: JSON.parse(decoded),
      accessToken: user.accessToken
    },
  };
};