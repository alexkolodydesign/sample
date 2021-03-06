import React from 'react';
import { Polyline } from 'react-google-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Paths = ({ coordinates, trailColor, highlightedTrail, slug, togglePopups }) => {
  if (!coordinates) return null;
  if (Array.isArray(coordinates[0])) {
    // If a trail has multiple paths
    return (
      <>
        {coordinates.map((line, k) => {
          if (!line) return null;
          return (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={k}>
              <Polyline
                path={line.map(point => ({
                  lat: Number(point.lat),
                  lng: Number(point.lng),
                  elevation: Number(point.elevation)
                }))}
                options={{
                  strokeColor: trailColor,
                  strokeOpacity: 0.0,
                  strokeWeight: 100
                }}
                onClick={e => {
                  const coords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                  togglePopups(slug, coords);
                }}
              />
              <Polyline
                path={line.map(point => ({
                  lat: Number(point.lat),
                  lng: Number(point.lng),
                  elevation: Number(point.elevation)
                }))}
                options={{
                  strokeColor: trailColor,
                  strokeOpacity: 1,
                  strokeWeight: highlightedTrail === slug ? 6 : 3
                }}
                onClick={e => {
                  const coords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                  togglePopups(slug, coords);
                }}
              />
            </React.Fragment>
          );
        })}
      </>
    );
  }
  return (
    <>
      <Polyline
        path={coordinates}
        options={{
          strokeColor: trailColor,
          strokeOpacity: 0.0,
          strokeWeight: 100
        }}
        onClick={e => {
          const coords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          togglePopups(slug, coords);
        }}
      />
      <Polyline
        path={coordinates}
        options={{
          strokeColor: trailColor,
          strokeOpacity: 1,
          strokeWeight: highlightedTrail === slug ? 6 : 3
        }}
        onClick={e => {
          const coords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          togglePopups(slug, coords);
        }}
      />
    </>
  );
};

Paths.propTypes = {
  coordinates: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
      }),
      PropTypes.arrayOf(
        PropTypes.shape({
          lat: PropTypes.number,
          lng: PropTypes.number
        })
      )
    ])
  ),
  trailColor: PropTypes.string.isRequired,
  highlightedTrail: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  togglePopups: PropTypes.func.isRequired
};

Paths.defaultProps = {
  coordinates: null
};

// Redux
const mapStateToProps = state => ({
  highlightedTrail: state.map.highlightedTrail
});
const mapDispatchToProps = dispatch => ({
  togglePopups: (trail, coords) =>
    dispatch({
      type: 'TOGGLE_POPUPMENUS',
      popups: {
        regionPopup: false,
        activeRegionPopup: '',
        trailPopup: true,
        activeTrailPopup: trail,
        menuCoords: coords
      }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Paths);
