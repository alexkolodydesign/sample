import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { regionShape } from '../../lib/propTypes';

const RegionMarker = ({
  togglePopups,
  activeRegionPopup,
  region: { markerCoordinates, markerIcon, regionName, trailCount, regionImage },
  zoom
}) => (
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
        </div>
      </InfoWindow>
    )}
  </Marker>
);

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
        activeTrailPopup: ''
      }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionMarker);
