import React from 'react';
import { Polyline } from 'react-google-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Paths = ({ coordinates, trailColor, highlight, slug }) => {
  if (!coordinates) return null;
  return (
    <React.Fragment>
      <Polyline
        path={coordinates}
        options={{
          strokeColor: trailColor,
          strokeOpacity: 0.0,
          strokeWeight: 100
        }}
        onClick={() => {
          // const coord = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          // props.toggleMenu(coord)
          // props.onTrailToggle(regionTrail, coord);
          // props.togglePopupMenu(trail.slug);
        }}
      />
      <Polyline
        path={coordinates}
        options={{
          strokeColor: trailColor,
          strokeOpacity: 1,
          strokeWeight: highlight === slug ? 6 : 3
        }}
        onClick={() => {
          // const coord = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          // props.toggleMenu(coord)
          // props.onTrailToggle(regionTrail, coord);
          // props.togglePopupMenu(trail.slug);
        }}
      />
    </React.Fragment>
  );
};

Paths.propTypes = {
  coordinates: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  ),
  trailColor: PropTypes.string.isRequired,
  highlight: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired
};

Paths.defaultProps = {
  coordinates: null
};

// Redux
const mapStateToProps = (state, ownProps) => ({
  highlight: state.map.highlightTrail,
  ...ownProps
});

export default connect(
  mapStateToProps,
  null
)(Paths);
