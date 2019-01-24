import React from 'react';
import { Marker } from 'react-google-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { regionShape } from '../../utils/propTypes';

const RegionInfo = dynamic(() =>
  import(/* webpackChunkName: "RegionInfo" */ './RegionInfo')
);

const RegionMarker = ({ togglePopups, activeRegionPopup, region, zoom }) => {
  const { markerCoordinates, markerIcon, regionName } = region;
  return (
    <Marker
      className="region_popup"
      position={{
        lat: markerCoordinates.lat,
        lng: markerCoordinates.lng
      }}
      icon={{
        url: markerIcon,
        scaledSize: new window.google.maps.Size(68, 68)
      }}
      onClick={() => {
        togglePopups(regionName);
      }}
    >
      {activeRegionPopup === regionName && (
        <RegionInfo region={region} zoom={zoom} togglePopups={togglePopups} />
      )}
    </Marker>
  );
};

RegionMarker.propTypes = {
  togglePopups: PropTypes.func.isRequired,
  region: regionShape.isRequired,
  zoom: PropTypes.func.isRequired,
  activeRegionPopup: PropTypes.string.isRequired
};

// Redux
const mapStateToProps = state => ({
  activeRegionPopup: state.map.popupMenus.activeRegionPopup
});
const mapDispatchToProps = dispatch => ({
  togglePopups: region =>
    dispatch({
      type: 'TOGGLE_POPUPMENUS',
      popups: {
        regionPopup: true,
        activeRegionPopup: region,
        trailPopup: false,
        activeTrailPopup: '',
        menuCoords: {
          lat: null,
          lng: null
        }
      }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionMarker);
