import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const TrailListMenu = dynamic(() => import('./TrailListMenu'));

const TrailList = ({ toggleMenus, trailsListMenu }) => (
  <>
    <button
      type="button"
      onClick={() => toggleMenus(!trailsListMenu)}
      className={trailsListMenu ? 'active trail_list' : 'trail_list'}
    >
      <img src="/static/images/menu/trail-list.svg" alt="Trail List" />
      <p>Trail List</p>
      <style jsx>
        {`
          button {
            padding: 4px 5px;
            background: #4d4e4e;
            color: #fff;
            border: none;
            border-radius: 0.5rem;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 500ms;
            position: relative;
            &:hover {
              background: #262727;
              &.active {
                background: #0d93f2;
              }
            }
            &.active {
              background: #3fa9f5;
            }
          }
          img {
            width: 3rem;
            height: 3rem;
            padding: 3px;
          }
          p {
            display: none;
            margin: 0;
            padding-right: 1rem;
          }
          @media screen and (min-width: 768px) {
            button {
              display: flex;
            }
            p {
              display: block;
            }
            img {
              width: 4rem;
            }
          }
          @media screen and (min-width: 992px) {
            img {
              width: 4.5rem;
            }
          }
        `}
      </style>
    </button>
    {trailsListMenu && (
      <TrailListMenu toggleMenu={toggleMenus} menuState={trailsListMenu} />
    )}
  </>
);

TrailList.propTypes = {
  toggleMenus: PropTypes.func.isRequired,
  trailsListMenu: PropTypes.bool.isRequired
};

// Redux
const mapStateToProps = state => ({
  trailsListMenu: state.map.menus.trailsListMenu
});
const mapDispatchToProps = dispatch => ({
  toggleMenus: trailsListMenu =>
    dispatch({
      type: 'TOGGLE_MENUS',
      menus: {
        filterTrailsMenu: false,
        trailsListMenu,
        optionsMenu: false
      }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrailList);
