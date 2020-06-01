import secret_info from '../secret-keys';

export function getSpotifyAuth(): void {
  const { client_id, client_secret } = secret_info;
  const redirectUri = 'http://localhost:8080/';
  const scope = 'user-read-private user-read-email';
  const responseType = 'code';
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;

  window.location.replace(authUrl);
}