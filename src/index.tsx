import React, { ReactElement, useEffect, useState } from 'react';
import { ConnectButton, Header } from '../library/components';
import { TopArtistSuccessReponse } from '../library/types/spotify'
import { openSpotifyAuth, getUsersTopArtists } from '../library/api/spotify';

interface TopArtist {
  name: string;
  genres: string[];
}

interface TopGenres {
  [key: string]: number;
}

type SortedGenres = [string, number][];

const App = (): ReactElement => {
  const [authToken, setAuthToken] = useState('');
  const [topArtists, setTopArtists] = useState<TopArtist[]>([]);
  const [topGenres, setTopGenres] = useState<SortedGenres>([]);
  
  useEffect(() => {
    setAuthToken(getAuthTokenFromURL());
    if (!authToken) return;
    getUsersTopArtists(authToken).then((data: TopArtistSuccessReponse) => {
      const topArtists = data.items;
      setTopArtists(topArtists.map(artist => ({
        name: artist.name,
        genres: artist.genres
      })));

      const genres: TopGenres = {};
      topArtists.forEach(artist => {
        artist.genres.forEach((genre: string) => {
          if (genres[genre]) {
            genres[genre]++
          } else {
            genres[genre] = 1;
          }
        })
      });

      const sortedGenres: SortedGenres = [];
      for (const genre in genres) {
        sortedGenres.push([genre, genres[genre]])
      }
      
      setTopGenres(sortedGenres.sort((a, b) => b[1] - a[1]));
    })
  })

  const getAuthTokenFromURL = (): string => {
    // URL looks like http://localhost:8080/#access_token=ABCDEF&token_type=Bearer&expires_in=3600
    const url: string = window.location.href;
    const splitUrlFromQueryParams : string[] = url.split('access_token=');
    
    if (splitUrlFromQueryParams.length <= 1) return '';

    const queryParams = splitUrlFromQueryParams[1].split('&');
    const authToken: string = queryParams[0];
    return authToken;
  }

  return (
    <div className="container" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <Header>Spotify Cities</Header>
      <ConnectButton
        onClick={() => openSpotifyAuth()}
      >
        Connect your Spotify account
      </ConnectButton>
      <div style={{marginBottom: 20}}>
        {
          topArtists.map((artist, index) => {
            return (
              <p
                key={index}
              >
                <strong style={{marginRight: 10}}>
                  {index + 1}) {artist.name}
                </strong>
                {artist.genres.toString()}
              </p>
            )
          })
        }
      </div>

      <Header>Genres</Header>
      <div style={{marginBottom: 20}}>
        {
          topGenres.map((genre, index) => (
            <p key={index}>
              <strong>{genre[0]}</strong>: {genre[1]}
            </p>
          ))
        }
      </div>
    </div>
  )
}

export default App;