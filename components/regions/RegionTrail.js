import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { trailShape } from '../../utils/propTypes';
import TrailCoordinatesData from '../services/TrailCoordinatesData';
import Paths from '../trails/Paths';
import getTrailColor from '../../utils/getTrailColor';

const RegionTrailInfo = dynamic(() => import('./RegionTrailInfo'));

const RegionTrail = ({ trail, activeTrailPopup }) => {
  const { url } = trail.custom_data.jsonCoordinates;
  if (!trail.custom_data.jsonCoordinates.url) return null;
  // Change Trail Color Based on the First Value of Recommended Use Array
  const trailColor = trail.custom_data.recommendedUse
    ? getTrailColor(trail.custom_data.recommendedUse[0].value)
    : '#ff0000';
  return (
    <TrailCoordinatesData url={url}>
      {({ loading, coordinates }) => {
        if (loading) return null;
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
      }}
    </TrailCoordinatesData>
  );
};

RegionTrail.propTypes = {
  trail: trailShape.isRequired,
  activeTrailPopup: PropTypes.string.isRequired
};

// Redux
const mapStateToProps = state => ({
  activeTrailPopup: state.map.popupMenus.activeTrailPopup
});

export default connect(
  mapStateToProps,
  null
)(RegionTrail);
