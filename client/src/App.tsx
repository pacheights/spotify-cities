import React, { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:443';

function App() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const url = window.location.href;
    const params = url.split('access_token=');
    const accessToken = params[1]?.split('&')[0];
    
    if (!accessToken) return;

    fetch(`${BASE_URL}/artists?token=${accessToken}`)
    .then(res => res.json())
    .then(json => {
      setArtists(json.items)
    })
  })

  return (
    <div className="App">
      <button onClick={async () => {
        window.location.replace(`${BASE_URL}/authorize`);
      }}>
        Connect to Spotify
      </button>
      <div>

      </div>
    </div>
  );
}

export default App;
