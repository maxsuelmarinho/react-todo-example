import auth0 from 'auth0-js';

const auth0Client = new auth0.WebAuth({
  domain: `${process.env.REACT_APP_AUTH0_DOMAIN}`,
  audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`,
  clientID: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
  redirectUri: 'http://localhost:3000/callback',
  responseType: 'idToken',
  scope: 'openid profile email'
});

export function handleAuthentication() {
  return new Promise((resolve, reject) => {
    auth0Client.parseHash((err, authResult) => {
      if (err) return reject(err);
      if (!authResult || !authResult.idToken) {
        return reject(err);
      }

      const idToken = authResult.idToken;
      const profile = authResult.idTokenPayload;
      const expiresAt = authResult.idTokenPayload.exp * 1000;

      resolve({
        authenticated: true,
        idToken,
        profile,
        expiresAt
      });
    });
  });
}

export function signIn() {
  auth0Client.authorize();
}

export function signOut() {
  auth0Client.logout({
    returnTo: 'http://localhost:3000',
    clientID: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`
  });
}
