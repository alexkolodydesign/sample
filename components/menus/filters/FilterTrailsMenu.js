import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Option from './Option';
import ResetMap from './ResetMap';
import { trailTypeShape } from '../../../utils/propTypes';
import FilterTrailsMenuStyles from './FilterTrailsMenu.styles';

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
  <FilterTrailsMenuStyles filterMenu={filterMenu}>
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
  </FilterTrailsMenuStyles>
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
