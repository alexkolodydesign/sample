import React from 'react';
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import MainMap from './MainMap';
import MainMapSetupStyles from './MainMapSetup.styles';

const MainMapSetup = () => (
  <MainMapSetupStyles>
    <MapContainer
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} id="washington_map" />}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ&v=3.exp&libraries=geometry,drawing,places"
    />
  </MainMapSetupStyles>
);

const MapContainer = withScriptjs(withGoogleMap(() => <MainMap />));

export default MainMapSetup;
