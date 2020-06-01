import React, { ReactElement } from 'react';
import { ConnectButton, Header } from '../library/components';
import { getSpotifyAuth } from '../library/api/spotify';

const App = (): ReactElement => {
  return (
    <div className="container" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <Header>Spotify Locations</Header>
      <ConnectButton
        onClick={() => getSpotifyAuth()}
      >
        Connect your Spotify account
      </ConnectButton>
    </div>
  )
}

export default App;