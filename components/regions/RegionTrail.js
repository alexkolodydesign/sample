import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { trailCoordinatesShape, trailShape } from '../../utils/propTypes';
import Paths from '../trails/Paths';
import getTrailColor from '../../utils/getTrailColor';

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
    const { trail, activeTrailPopup } = this.props;
    const { coordinates } = this.state;
    // Change Trail Color Based on the First Value of Recommended Use Array
    const trailColor = trail.custom_data.recommendedUse
      ? getTrailColor(trail.custom_data.recommendedUse[0].value)
      : '#ff0000';
    return (
      <>
        <Paths
          coordinates={coordinates}
          trail={trail}
          trailColor={trailColor}
          slug={trail.slug}
        />
        {activeTrailPopup === trail.slug && <RegionTrailInfo trail={trail} />}
      </>
    );
  }
}

RegionTrail.propTypes = {
  trailCoordinates: trailCoordinatesShape.isRequired,
  trail: trailShape.isRequired,
  activeTrailPopup: PropTypes.string.isRequired,
  updateTrailCoords: PropTypes.func.isRequired
};

// Redux
const mapStateToProps = state => ({
  trailCoordinates: state.trailCoordinates,
  activeTrailPopup: state.map.popupMenus.activeTrailPopup
});
const mapDispatchToProps = dispatch => ({
  updateTrailCoords: (coords, slug) => {
    const data = { coords, slug };
    return dispatch({ type: 'UPDATE_TRAIL_COORDINATES', data });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionTrail);
