import { connect } from 'react-redux'
import TrailListMenu from './TrailListMenu'
import { toggleMenus } from '../../redux/actions'

// Redux
const mapStateToProps = (state, ownProps) => {
  return {
    menus: state.map.menus,
    trails: state.map.trails
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleMenus: (menu) => dispatch(toggleMenus(menu))
  };
};

class TrailList extends React.Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  toggleMenu() {
    if (this.props.menus.trailsListMenu == true) {
      this.props.toggleMenus({
        trailsListMenu: 'exiting',
        optionsMenu: this.props.menus.optionsMenu,
        filterTrailsMenu: this.props.menus.filterTrailsMenu
      })
      setTimeout( () => this.props.toggleMenus({
        trailsListMenu: false,
        optionsMenu: this.props.menus.optionsMenu,
        filterTrailsMenu: this.props.menus.filterTrailsMenu
      }), 500)
    } else {
      this.props.toggleMenus({
        trailsListMenu: true,
        optionsMenu: false,
        filterTrailsMenu: false
      })
    }
  }
  render() {
    return (
      <React.Fragment>
        <button onClick={this.toggleMenu} className={this.props.menus.trailsListMenu ? "active trail_list" : "trail_list"}>
          <img src="/static/images/menu/trail-list.svg" alt="Trail List"/>
          <p>Trail List</p>
        </button>
        {this.props.menus.trailsListMenu &&
          <TrailListMenu toggleMenu={this.toggleMenu} menuState={this.props.menus.trailsListMenu} />
        }
        <style jsx>{`
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
              display:flex;
            }
            p {display: block;}
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

export default connect(mapStateToProps, mapDispatchToProps)(TrailList)
