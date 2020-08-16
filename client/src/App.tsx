import React, { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:443';

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const url = window.location.href;
    const params = url.split('access_token=');
    const accessToken = params[1]?.split('&')[0];
    
    if (!accessToken || locations?.length > 0) return;

    fetch(`${BASE_URL}/artists?token=${accessToken}`)
    .then(res => res.json())
    .then(json => {
      setLocations(json)
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
        {
          locations.map(locationObj => {
            const city = Object.keys(locationObj)[0];
            const listeners = locationObj[city];
            return (
              <p>{`${city}: ${listeners}`}</p>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
