import React from 'react';
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import MainMap from './MainMap';
import { regionsShape } from '../../lib/propTypes';

const MainMapSetup = ({ regions }) => (
  <div className="map">
    <MapContainer
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} id="washington_map" />}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ&v=3.exp&libraries=geometry,drawing,places"
      regions={regions}
    />
    <style jsx>
      {`
        .map {
          background: #eee;
          position: fixed;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: calc(100% - 17.5rem);
          z-index: 1;
        }
        @media screen and (min-width: 768px) {
          .map {
            height: calc(100% - 15.75rem);
          }
        }
        @media screen and (min-width: 992px) {
          .map {
            height: calc(100% - 10.75rem);
          }
        }
      `}
    </style>
  </div>
);

MainMapSetup.propTypes = {
  regions: regionsShape.isRequired
};

const MapContainer = withScriptjs(
  withGoogleMap(({ regions }) => <MainMap regions={regions} />)
);

export default MainMapSetup;
