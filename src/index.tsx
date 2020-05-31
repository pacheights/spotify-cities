import React, { ReactElement } from 'react';
import { ConnectButton, Header } from '../library/components';

const App = (): ReactElement => {
  return (
    <div className="container" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <Header>Spotify Locations</Header>
      <ConnectButton>Connect your Spotify account</ConnectButton>
    </div>
  )
}

export default App;