import React, { useState, useEffect } from 'react';
import { City as Location } from "../../types/server";
import City from './components/City';

const BASE_URL = 'http://localhost:443';

const data: Location[] = [
  {
    listeners: 2240,
    location: 'Miami, US',
    artists: ['Tame Impala', 'Polo & Pan', 'J Balvin']
  },
  {
    listeners: 3500,
    location: 'Libson, PT',
    artists: ['Polo & Pan', 'Panda Bear', 'Animal Collective', 'Washed Out']
  },
  {
    listeners: 4400,
    location: 'Brooklyn, NY',
    artists: ['Sufjan Stevens', 'Eola', 'Bob Dylan', 'Vampire Weekend']
  },
  {
    listeners: 2200,
    location: 'Paris, FR',
    artists: ['Daft Punk', 'Polo & Pan', 'L\'Imperatrice', 'Tame Impala']
  }
]

function App() {
  const [locations, setLocations] = useState([] as Location[]);

  useEffect(() => {
    const url = window.location.href;
    const params = url.split('access_token=');
    const accessToken = params[1]?.split('&')[0];

    setLocations(data.sort((a, b) => {
      return b.listeners - a.listeners;
    }))

    return;
    
    if (!accessToken || locations?.length > 0) return;

    fetch(`${BASE_URL}/artists?token=${accessToken}`)
    .then(res => res.json())
    .then((locations: Location[]) => {
      setLocations(locations.sort((a, b) => {
        return b.listeners - a.listeners;
      }))
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
          locations.map((location, index) => (
            <City 
              location={location}
              rank={index + 1}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
