import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GPSButton from './GPS.styles';

const GPS = ({ gps, toggleGPS }) => (
  <>
    <GPSButton className={gps ? 'active gps' : 'gps'} onClick={toggleGPS} type="button">
      <img src="/static/images/menu/gps.svg" alt="Your GPS" />
    </GPSButton>
  </>
);

GPS.propTypes = {
  gps: PropTypes.bool.isRequired,
  toggleGPS: PropTypes.func.isRequired
};

// Redux
const mapStateToProps = state => ({ gps: state.map.gps });
const mapDispatchToProps = dispatch => ({
  toggleGPS: () => dispatch({ type: 'TOGGLE_GPS' })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GPS);
