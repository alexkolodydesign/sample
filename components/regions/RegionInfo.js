import React from 'react';
import { InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types';
import { regionShape } from '../../utils/propTypes';

const RegionInfo = ({ togglePopups, region, zoom }) => {
  const { regionImage, regionName, markerCoordinates, trailCount } = region;
  return (
    <InfoWindow
      options={{ maxWidth: 320 }}
      onCloseClick={() => {
        togglePopups('');
      }}
    >
      <div className="info_wrapper">
        <h3>{regionName}</h3>
        <p>{trailCount} Trails</p>
        {regionImage && <img src={regionImage} alt="" />}
        <button
          type="button"
          className="explore"
          onClick={() =>
            zoom(12, {
              lat: markerCoordinates.lat,
              lng: markerCoordinates.lng
            })
          }
        >
          Explore Region
        </button>
        <style jsx>
          {`
            button {
              background: none;
              border: none;
              cursor: pointer;
              padding: 1.5rem;
            }
          `}
        </style>
      </div>
    </InfoWindow>
  );
};

RegionInfo.propTypes = {
  togglePopups: PropTypes.func.isRequired,
  region: regionShape.isRequired,
  zoom: PropTypes.func.isRequired
};

export default RegionInfo;
