import React from 'react';
import { InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types';
import { regionShape } from '../../utils/propTypes';
import RegionInfoButton from './RegionInfo.styles';

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
        <RegionInfoButton
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
        </RegionInfoButton>
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
