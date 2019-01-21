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
class TrailList extends React.Component {
  state = { menu: this.props.trailsListMenu };

  static getDerivedStateFromProps = (nextProps, nextState) => {
    console.log({ nextProps, nextState });
    return nextState;
  };

  toggleMenu = () => {
    this.setState(state => {
      this.props.toggleMenus(!state.menu);
      return { menu: !state.menu };
    });
  };

  render() {
    const { menu } = this.state;
    const { trailsListMenu } = this.props;
    return (
      <>
        {console.log({ menu, trailsListMenu })}
        <TrailListButton
          type="button"
          onClick={this.toggleMenu}
          className={menu ? 'active trail_list' : 'trail_list'}
        >
          <img src="/static/images/menu/trail-list.svg" alt="Trail List" />
          <p>Trail List</p>
        </TrailListButton>
        {menu && trailsListMenu && <TrailListMenu />}
      </>
    );
  }
}

TrailList.propTypes = {
  toggleMenus: PropTypes.func.isRequired,
  trailsListMenu: PropTypes.bool.isRequired
};

// Redux
const mapStateToProps = state => ({
  trailsListMenu: state.map.menus.trailsListMenu
});
const mapDispatchToProps = dispatch => ({
  toggleMenus: trailsListMenu => {
    console.log('DISPATCH: ', { trailsListMenu });
    return dispatch({
      type: 'TOGGLE_MENUS',
      menus: {
        filterTrailsMenu: false,
        trailsListMenu,
        optionsMenu: false
      }
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrailList);
