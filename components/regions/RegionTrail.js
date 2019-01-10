import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Paths from '../trails/Paths';
import { trailCoordinatesShape, trailShape, coordinateShape } from '../../lib/propTypes';

const RegionTrailInfo = dynamic(() => import('./RegionTrailInfo'));

class RegionTrail extends React.Component {
  state = { coordinates: [], loading: true };

  componentDidMount = () => {
    this.setCoordinates();
  };

  setCoordinates = async () => {
    const { trailCoordinates, trail, updateTrailCoords } = this.props;
    // If trail does not have json coordinates exit here
    if (!trail.custom_data.jsonCoordinates.url) return;
    // If redux store already has coordinates on trail then set component state and set loading to false
    const matchingTrail = trailCoordinates.find(
      reduxTrail => trail.slug === reduxTrail.slug
    );
    if (matchingTrail && matchingTrail.coordinates) {
      this.setState({ loading: false, coordinates: matchingTrail.coordinates });
      return;
    }
    // If trail coordinates are not found in redux store try and get them
    axios.get(`/api/coordinates?url=${trail.custom_data.jsonCoordinates.url}`).then(
      data => {
        const coords = data.data.trail.coordinates;
        updateTrailCoords(coords, trail.slug);
        this.setState({ loading: false, coordinates: coords });
      },
      error => {
        console.log(error);
      }
    );
  };

  render() {
    const { loading } = this.state;
    if (loading) return null;
    // If coordinates loaded then proceed to create variables and render
    const { trail, metricType, activeTrailPopup, togglePopups, menuCoords } = this.props;
    const { coordinates } = this.state;
    // Change Trail Color Based on the First Value of Recommended Use Array
    let trailColor;
    if (trail.custom_data.recommendedUse) {
      switch (trail.custom_data.recommendedUse[0].value) {
        case 'hiking':
          trailColor = '#ed264c';
          break;
        case 'biking':
          trailColor = '#ff9100';
          break;
        case 'equestrian':
          trailColor = '#662f8e';
          break;
        case 'ohv':
          trailColor = '#00a89c';
          break;
        default:
          trailColor = '#ff0000';
      }
    } else {
      trailColor = '#ff0000';
    }
    return (
      <React.Fragment>
        <Paths
          coordinates={coordinates}
          trail={trail}
          trailColor={trailColor}
          slug={trail.slug}
          togglePopups={togglePopups}
        />
        {activeTrailPopup === trail.slug && (
          <RegionTrailInfo
            trail={trail}
            togglePopups={togglePopups}
            menuCoords={menuCoords}
            metricType={metricType}
          />
        )}
      </React.Fragment>
    );
  }
}

RegionTrail.propTypes = {
  trailCoordinates: trailCoordinatesShape.isRequired,
  trail: trailShape.isRequired,
  metricType: PropTypes.string.isRequired,
  activeTrailPopup: PropTypes.string.isRequired,
  menuCoords: coordinateShape.isRequired,
  updateTrailCoords: PropTypes.func.isRequired,
  togglePopups: PropTypes.func.isRequired
};

// Redux
const mapStateToProps = state => ({
  map: state.map,
  trailCoordinates: state.trailCoordinates,
  activeTrailPopup: state.map.popupMenus.activeTrailPopup,
  menuCoords: state.map.popupMenus.menuCoords
});
const mapDispatchToProps = dispatch => ({
  updateTrailCoords: (coords, slug) => {
    const data = { coords, slug };
    return dispatch({ type: 'UPDATE_TRAIL_COORDINATES', data });
  },
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
)(RegionTrail);
