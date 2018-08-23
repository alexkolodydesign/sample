import { connect } from 'react-redux';
import { toggleMenus } from '../../redux/actions'
import Options from './Options'

// Redux
const mapStateToProps = (state, ownProps) => {
  return {
    menus: state.map.menus
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleMenus: (menu) => dispatch(toggleMenus(menu))
  };
};

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.toggleOptions = this.toggleOptions.bind(this)
  }
  toggleOptions() {
    if (this.props.menus.optionsMenu == true) {
      this.props.toggleMenus({
        trailsListMenu: this.props.menus.trailsListMenu,
        optionsMenu: 'exiting',
        filterTrailsMenu: this.props.menus.filterTrailsMenu
      })
      setTimeout( () => this.props.toggleMenus({
        trailsListMenu: this.props.menus.trailsListMenu,
        optionsMenu: false,
        filterTrailsMenu: this.props.menus.filterTrailsMenu
      }), 500)
    } else {
      this.props.toggleMenus({
        trailsListMenu: false,
        optionsMenu: true,
        filterTrailsMenu: false
      })
    }
  }
  render() {
    return (
      <React.Fragment>
        <button className={this.props.menus.optionsMenu ? "active settings" : "settings"} onClick={this.toggleOptions}>
          <img src="/static/images/menu/settings.svg" alt="Settings"/>
        </button>
        {this.props.menus.optionsMenu &&
          <Options toggleOptions={this.toggleOptions} menuState={this.props.menus.optionsMenu} />
        }
        <style jsx>{`
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
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
