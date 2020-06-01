import React, { ReactElement, useEffect, useState } from 'react';
import { ConnectButton, Header } from '../library/components';
import { TopArtistSuccessReponse } from '../library/types/spotify'
import { openSpotifyAuth, getUsersTopArtists } from '../library/api/spotify';

const App = (): ReactElement => {
  const [authToken, setAuthToken] = useState('');
  
  useEffect(() => {
    // URL looks like http://localhost:8080/#access_token=ABCDEF&token_type=Bearer&expires_in=3600
    const url: string = window.location.href;
    const splitUrlFromQueryParams : string[] = url.split('access_token=');
    
    if (splitUrlFromQueryParams.length > 1) {
      const queryParams = splitUrlFromQueryParams[1].split('&');
      const authToken: string = queryParams[0];

      getUsersTopArtists(authToken)
      .then((data: TopArtistSuccessReponse) => {
        const topArtists = data.items;
        const topArtistsNames = topArtists.map(artist => artist.name);
        console.log(topArtistsNames)
      })
    }
  })

  return (
    <div className="container" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <Header>Spotify Cities</Header>
      <ConnectButton
        onClick={() => openSpotifyAuth()}
      >
        Connect your Spotify account
      </ConnectButton>
    </div>
  )
}

export default App;