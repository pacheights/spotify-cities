import React, { useState, useEffect } from 'react';
import { City } from "../../types/server";

const BASE_URL = 'http://localhost:443';

function App() {
  const [locations, setLocations] = useState([] as City[]);

  useEffect(() => {
    const url = window.location.href;
    const params = url.split('access_token=');
    const accessToken = params[1]?.split('&')[0];
    
    if (!accessToken || locations?.length > 0) return;

    fetch(`${BASE_URL}/artists?token=${accessToken}`)
    .then(res => res.json())
    .then((locations: City[]) => {
      setLocations(locations)
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
          locations.map(location => {
            const city = location.location;
            const listeners = location.listeners;
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
