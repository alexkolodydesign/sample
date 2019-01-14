import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Option from '../filters/Option';

const Options = ({
  optionsMenu,
  metricType,
  mapStyle,
  changeMetricType,
  changeMapStyle,
  toggleFirstTimeUser,
  toggleMenus
}) => (
  <div className={optionsMenu === 'exiting' ? 'exiting menu' : 'menu'}>
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
    <style jsx>
      {`
        h3 {
          text-transform: uppercase;
          margin: 0 0 0 1rem;
          color: #fff;
        }
        .menu {
          padding: 1rem 0.5rem 2rem 0.5rem;
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
          background: #3fa9f5;
          width: 35rem;
          height: 40rem;
          position: absolute;
          right: 0;
          top: -45rem;
          z-index: -1;
          overflow: hidden;
          animation-name: slideUp;
          animation-duration: 500ms;
          &.exiting {
            transition: 500ms;
            transform: translateY(25rem);
            opacity: 0;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(25rem);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .options {
          background-image: linear-gradient(
              rgba(255, 255, 255, 0.98),
              rgba(255, 255, 255, 0.98)
            ),
            url(/static/images/background-pattern.svg);
          padding: 0 0.5rem;
          margin-top: 1rem;
          height: calc(100% - 5rem);
          overflow-y: scroll;
        }
        .close {
          color: #3fa9f5;
          background: #fff;
          width: auto;
          margin: 0;
          position: absolute;
          right: 3rem;
          top: 1rem;
          padding: 0.5rem 0.5rem;
          border-radius: 100%;
          line-height: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 500ms;
          opacity: 0.5;
          &:hover {
            opacity: 1;
          }
        }
        button {
          margin: 1rem 0;
          padding: 1rem;
          color: #fff;
          background: #3fa9f5;
          border: 0.1rem solid #fff;
          width: 100%;
          text-transform: uppercase;
          cursor: pointer;
          -webkit-transition: all 500ms;
          transition: all 500ms;
          &:hover {
            background: #0d93f2;
          }
        }
      `}
    </style>
  </div>
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
