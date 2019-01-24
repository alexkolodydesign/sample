import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TrailSystemGuideStyles from './TrailSystemGuide.styles';

const TrailSystemGuide = ({ system, highlightRegion, goToSystem }) => (
  <TrailSystemGuideStyles>
    <div>
      <button
        type="button"
        className={system === 'zion-national-park' ? 'active' : undefined}
        onClick={() => {
          highlightRegion('Canyon');
          goToSystem(12, { lat: 37.251888, lng: -112.96201 });
        }}
      >
        Zion National Park
      </button>
    </div>
    <div>
      <button
        type="button"
        className={system === 'snow-canyon-state-park' ? 'active' : undefined}
        onClick={() => {
          highlightRegion('Urban');
          goToSystem(12, { lat: 37.204665, lng: -113.644752 });
        }}
      >
        Snow Canyon State Park
      </button>
    </div>
    <div>
      <button
        type="button"
        className={system === 'gooseberry-mesa' ? 'active' : undefined}
        onClick={() => {
          highlightRegion('Mesa');
          goToSystem(12, { lat: 37.142663, lng: -113.190518 });
        }}
      >
        Gooseberry Mesa
      </button>
    </div>
  </TrailSystemGuideStyles>
);

// Redux
const mapStateToProps = state => ({
  system: state.map.system
});
const mapDispatchToProps = dispatch => ({
  goToSystem: (zoom, center) => {
    const location = { zoom, center };
    return dispatch({ type: 'GO_TO_SYSTEM', location });
  },
  highlightRegion: name => dispatch({ type: 'HIGHLIGHT_REGION', name })
});

TrailSystemGuide.propTypes = {
  goToSystem: PropTypes.func.isRequired,
  highlightRegion: PropTypes.func.isRequired,
  system: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrailSystemGuide);
