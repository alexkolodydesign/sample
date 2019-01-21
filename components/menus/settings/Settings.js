import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Options from './Options';
import SettingsButton from './Settings.styles';

const Settings = ({ optionsMenu, toggleMenus }) => (
  <>
    <SettingsButton
      className={optionsMenu ? 'active settings' : 'settings'}
      onClick={() => toggleMenus(!optionsMenu)}
      type="button"
    >
      <img src="/static/images/menu/settings.svg" alt="Settings" />
    </SettingsButton>
    {optionsMenu && <Options />}
  </>
);

Settings.propTypes = {
  optionsMenu: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  toggleMenus: PropTypes.func.isRequired
};

// Redux
const mapStateToProps = state => ({
  optionsMenu: state.menus.optionsMenu
});
const mapDispatchToProps = dispatch => ({
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
)(Settings);
