import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Option from '../filters/Option';
import OptionsStyles from './Options.styles';

const Options = ({
  optionsMenu,
  metricType,
  mapStyle,
  changeMetricType,
  changeMapStyle,
  toggleFirstTimeUser,
  toggleMenus
}) => (
  <OptionsStyles className={optionsMenu === 'exiting' ? 'exiting menu' : 'menu'}>
    <h3>Options</h3>
    <button className="close" onClick={() => toggleMenus(!optionsMenu)} type="button">
      X
    </button>
    <div className="options">
      <Option
        title="Increments"
        selected={metricType}
        options={['Metric', 'Imperial']}
        action={changeMetricType}
      />
      <Option
        title="Map Style"
        selected={mapStyle}
        options={['RoadMap', 'Terrain', 'Satellite']}
        action={changeMapStyle}
      />
      <button
        onClick={() => {
          // document.cookie = 'firstTimeUser=true';
          toggleFirstTimeUser(true);
        }}
        type="button"
      >
        Restart Tutorial
      </button>
    </div>
  </OptionsStyles>
);

Options.propTypes = {
  optionsMenu: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  metricType: PropTypes.string.isRequired,
  mapStyle: PropTypes.string.isRequired,
  changeMetricType: PropTypes.func.isRequired,
  toggleFirstTimeUser: PropTypes.func.isRequired,
  changeMapStyle: PropTypes.func.isRequired,
  toggleMenus: PropTypes.func.isRequired
};

// Redux
const mapStateToProps = state => ({
  optionsMenu: state.map.menus.optionsMenu,
  metricType: state.map.metricType,
  mapStyle: state.map.mapStyle
});
const mapDispatchToProps = dispatch => ({
  changeMetricType: metricType =>
    dispatch({ type: 'CHANGE_METRIC_TYPE', option: metricType }),
  toggleFirstTimeUser: status => dispatch({ type: 'TOGGLE_FIRST_TIME_USER', status }),
  changeMapStyle: style => dispatch({ type: 'CHANGE_MAP_STYLE', style }),
  toggleMenus: optionsMenu =>
    dispatch({
      type: 'TOGGLE_MENUS',
      menus: {
        filterTrailsMenu: false,
        trailsListMenu: false,
        optionsMenu
      }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Options);
