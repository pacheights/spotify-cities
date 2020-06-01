import secret_info from '../secret-keys';
import { TopArtistSuccessReponse, ApiError } from '../types/spotify';
const { client_id } = secret_info;

export function openSpotifyAuth(): void {
  const redirectUri = 'http://localhost:8080/';
  const scope = 'user-read-private user-read-email user-top-read';
  const responseType = 'token';
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;

  window.location.replace(authUrl);
}

export async function getUsersTopArtists(authToken: string): Promise<TopArtistSuccessReponse | ApiError> {
  const topArtistsUrl = 'https://api.spotify.com/v1/me/top/artists';
  const response = fetch(topArtistsUrl, {
    headers: {
      "Authorization": `Bearer ${authToken}`
    }
  })
  return (await response).json();
}