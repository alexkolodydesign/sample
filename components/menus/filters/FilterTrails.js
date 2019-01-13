import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const FilterTrailsMenu = dynamic(() => import('./FilterTrailsMenu'));

const FilterTrails = ({ toggleMenus, filterTrailsMenu }) => (
  <>
    <button
      type="button"
      onClick={() => toggleMenus(!filterTrailsMenu)}
      className={filterTrailsMenu ? 'active filters' : 'filters'}
    >
      <img src="/static/images/menu/filter.svg" alt="Filter Trails" />
      <p className="filter-trails-title">Filter Trails</p>
      <style jsx>
        {`
          button {
            padding: 5px;
            background: #4d4e4e;
            color: #fff;
            border: none;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            transition: all 500ms;
            &:hover {
              background: #262727;
            }
            &.active:hover {
              background: #0d93f2;
            }
            &.active {
              background: #3fa9f5;
            }
            .filter-trails-title {
              display: none;
            }
          }
          img {
            width: 3rem;
            height: 3rem;
            padding: 3px;
          }
          p {
            margin: 0;
            padding-right: 1rem;
          }
          @media screen and (min-width: 768px) {
            button {
              .filter-trails-title {
                display: block;
              }
            }
            img {
              width: 4rem;
            }
          }
          @media screen and (min-width: 992) {
            img {
              width: 4.5rem;
            }
          }
        `}
      </style>
    </button>
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
