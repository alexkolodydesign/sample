import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Options from './Options';

const Settings = ({ optionsMenu, toggleMenus }) => (
  <>
    <button
      className={optionsMenu ? 'active settings' : 'settings'}
      onClick={() => toggleMenus(!optionsMenu)}
      type="button"
    >
      <img src="/static/images/menu/settings.svg" alt="Settings" />
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
          }
          img {
            width: 3rem;
            height: 3rem;
            padding: 3px;
          }
          @media screen and (min-width: 768px) {
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
    {optionsMenu && <Options />}
  </>
);

Settings.propTypes = {
  optionsMenu: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  toggleMenus: PropTypes.func.isRequired
};

// Redux
const mapStateToProps = state => ({
  optionsMenu: state.map.menus.optionsMenu
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
