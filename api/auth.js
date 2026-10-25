export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const host = req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const redirectUri = `${protocol}://${host}/api/callback`;
  
  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.append('client_id', clientId);
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append('scope', 'repo,user');

  res.writeHead(302, { Location: authUrl.toString() });
  res.end();
}
