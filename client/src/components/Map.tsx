import React from 'react';
import { GOOGLE_API } from '../secret-keys';
import { Map as GoogleMap, GoogleApiWrapper } from 'google-maps-react';

function Map(props) {
  return (
    <GoogleMap
      style={{
        width: '100%',
        height: '100vh',
        position: 'fixed'
      }}
      google={props.google}
      center={{
        lat: props.lat,
        lng: props.long,
      }}
    />
  )
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API
})(Map);