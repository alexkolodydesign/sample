import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import FilterTrailsButton from './FilterTrails.styles';

const FilterTrailsMenu = dynamic(() => import('./FilterTrailsMenu'));

const FilterTrails = ({ toggleMenus, filterTrailsMenu }) => (
  <>
    <FilterTrailsButton
      type="button"
      onClick={() => toggleMenus(!filterTrailsMenu)}
      className={filterTrailsMenu ? 'active filters' : 'filters'}
    >
      <img src="/static/images/menu/filter.svg" alt="Filter Trails" />
      <p className="filter-trails-title">Filter Trails</p>
    </FilterTrailsButton>
    {filterTrailsMenu && <FilterTrailsMenu />}
  </>
);

// Redux
const mapStateToProps = state => ({
  filterTrailsMenu: state.map.menus.filterTrailsMenu
});
const mapDispatchToProps = dispatch => ({
  toggleMenus: filterTrailsMenu =>
    dispatch({
      type: 'TOGGLE_MENUS',
      menus: {
        filterTrailsMenu,
        trailsListMenu: false,
        optionsMenu: false
      }
    })
});

FilterTrails.propTypes = {
  filterTrailsMenu: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  toggleMenus: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterTrails);
