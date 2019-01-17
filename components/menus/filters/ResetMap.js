import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ResetMapButton from './ResetMap.styles';

const ResetMap = ({ resetMap }) => (
  <>
    <ResetMapButton onClick={() => resetMap()} type="button">
      Reset Map
    </ResetMapButton>
  </>
);

// Redux
const mapDispatchToProps = dispatch => ({
  resetMap: () => {
    let zoom;
    if (window.innerWidth >= 768 && window.innerWidth < 991) zoom = 9;
    else if (window.innerWidth >= 992 && window.innerWidth < 1500) zoom = 10;
    else if (window.innerWidth > 1500) zoom = 11;
    else zoom = 8;
    return dispatch({ type: 'RESET_MAP', zoom });
  }
});

ResetMap.propTypes = {
  resetMap: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(ResetMap);
