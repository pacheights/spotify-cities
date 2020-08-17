import React from 'react';
import { City as Location } from '../../../types/server';

interface IProps {
  location: Location;
  rank: number;
}

function City(props: IProps) {
  return (
    <div
      style={{
        marginLeft: 20,
        marginBottom: 30
      }}
    >
      <h4>{props.rank}) {props.location.location}</h4>
      <div
        style={{
          marginLeft: 20,
          marginBottom: 15,
        }}
      >
        <h5>Top Aritsts:</h5>
        {
          props.location.artists.map(artist => <p style={{marginBottom: 4}}>{artist}</p>)
        }
      </div>
    </div>
  )
}

export default City;