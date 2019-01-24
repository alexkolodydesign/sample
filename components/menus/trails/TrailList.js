import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import TrailListButton from './TrailList.styles';

const TrailListMenu = dynamic(
  () => import(/* webpackChunkName: "TrailListMenu" */ './TrailListMenu'),
  { loading: () => null, ssr: false }
);

// TODO: Redux is not updating this components prop correctly
const TrailList = ({ trailsListMenu, toggleMenus }) => (
  <>
    <TrailListButton
      type="button"
      onClick={() => toggleMenus(!trailsListMenu)}
      className={trailsListMenu ? 'active trail_list' : 'trail_list'}
    >
      <img src="/static/images/menu/trail-list.svg" alt="Trail List" />
      <p>Trail List</p>
    </TrailListButton>
    {trailsListMenu && <TrailListMenu />}
  </>
);

TrailList.propTypes = {
  toggleMenus: PropTypes.func.isRequired,
  trailsListMenu: PropTypes.bool.isRequired
};

// Redux
const mapStateToProps = state => {
  return { trailsListMenu: state.menus.trailsListMenu };
};
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
