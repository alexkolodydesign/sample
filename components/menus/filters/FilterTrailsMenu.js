import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Option from './Option';
import ResetMap from './ResetMap';
import { trailTypeShape } from '../../../utils/propTypes';

const FilterTrailsMenu = ({
  filterMenu,
  toggleMenus,
  changeDifficulty,
  changeTrailLength,
  changeTrailTraffic,
  changeRouteType,
  changeTrailType,
  changeExclude,
  difficulty,
  trailTraffic,
  routeType,
  trailType,
  exclude
}) => (
  <div className={filterMenu === 'exiting' ? 'exiting menu' : 'menu'}>
    <h3>Filter Trails</h3>
    <button className="close" onClick={toggleMenus} type="button">
      X
    </button>
    <div className="options">
      <Option
        title="Difficulty"
        selected={difficulty}
        options={['Easy', 'Moderate', 'Challenging', 'Extreme', 'Clear']}
        action={changeDifficulty}
      />
      <Option
        title="Length of Trail"
        selected=""
        range
        action={changeTrailLength}
        options={[]}
      />
      <Option
        title="Traffic Density"
        selected={trailTraffic}
        options={['Light', 'Medium', 'Heavy', 'Clear']}
        action={changeTrailTraffic}
      />
      <Option
        title="Route Type"
        selected={routeType}
        options={['Loop', 'In and Back', 'Connector', 'Clear']}
        action={changeRouteType}
      />
      <Option
        title="Trail Type"
        selected={Object.keys(trailType)
          .filter(key => {
            if (trailType[key] === true) return key;
            return null;
          })
          .join(' ')}
        trailType={trailType}
        options={['Hiking', 'Biking', 'Equestrian', 'OHV']}
        action={changeTrailType}
      />
      <Option
        title="Exclude"
        selected={exclude ? 'On' : 'Off'}
        options={['On', 'Off']}
        action={changeExclude}
      />
    </div>
    <ResetMap />
    <style jsx>
      {`
        h3 {
          text-transform: uppercase;
          margin: 0 0 0 1rem;
          color: #fff;
        }
        .menu {
          left: -2rem;
          right: -2rem;
          bottom: -2.35rem;
          top: initial;

          z-index: 10;
          padding: 1rem 0.5rem 3.5rem 0.5rem;
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
          background: #3fa9f5;

          height: 40rem;
          position: absolute;
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
          background-position: center;
          background-size: 29rem auto;
          padding: 0 0.5rem;
          margin-top: 1rem;
          height: calc(100% - 5rem);
          overflow-y: scroll;
        }
        .close {
          color: #3fa9f5;
          background: #fff;
          border: none;
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
        @media screen and (min-width: 768px) {
          .menu {
            left: 0;
            top: -47rem;
            z-index: -1;
            width: 30rem;
          }
        }
      `}
    </style>
  </div>
);

// Redux
const mapStateToProps = state => ({
  filterMenu: state.map.menus.filterTrailsMenu,
  difficulty: state.map.filters.difficulty.default,
  trailTraffic: state.map.filters.trailTraffic,
  routeType: state.map.filters.routeType,
  trailType: state.map.filters.trailType,
  exclude: state.map.filters.exclude
});

const mapDispatchToProps = dispatch => ({
  changeDifficulty: difficulty => {
    const value = difficulty !== 'clear' ? difficulty : '';
    return dispatch({ type: 'CHANGE_DIFFICULTY', difficulty: value });
  },
  changeRouteType: routeType => {
    const value = routeType !== 'clear' ? routeType : '';
    return dispatch({ type: 'CHANGE_ROUTE_TYPE', routeType: value });
  },
  changeTrailTraffic: trailTraffic => {
    const value = trailTraffic !== 'clear' ? trailTraffic : '';
    return dispatch({ type: 'CHANGE_TRAIL_TRAFFIC', trailTraffic: value });
  },
  changeTrailType: trailType => dispatch({ type: 'CHANGE_TRAIL_TYPE', trailType }),
  changeTrailLength: trailLength =>
    dispatch({ type: 'CHANGE_TRAIL_LENGTH', trailLength }),
  changeExclude: exclude => {
    const value = exclude === 'on';
    return dispatch({ type: 'CHANGE_EXCLUDE', value });
  },
  toggleMenus: () =>
    dispatch({
      type: 'TOGGLE_MENUS',
      menus: {
        filterTrailsMenu: false,
        trailsListMenu: false,
        optionsMenu: false
      }
    })
});

FilterTrailsMenu.propTypes = {
  filterMenu: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  difficulty: PropTypes.string.isRequired,
  trailTraffic: PropTypes.string.isRequired,
  routeType: PropTypes.string.isRequired,
  trailType: trailTypeShape.isRequired,
  exclude: PropTypes.string.isRequired,
  changeRouteType: PropTypes.func.isRequired,
  changeTrailTraffic: PropTypes.func.isRequired,
  changeTrailType: PropTypes.func.isRequired,
  changeDifficulty: PropTypes.func.isRequired,
  changeTrailLength: PropTypes.func.isRequired,
  changeExclude: PropTypes.func.isRequired,
  toggleMenus: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterTrailsMenu);
