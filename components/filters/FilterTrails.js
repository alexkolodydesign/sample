import { connect } from 'react-redux';
import { toggleMenus } from '../../redux/actions'
import FilterTrailsMenu from './FilterTrailsMenu'

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

class FilterTrails extends React.Component {
  constructor(props) {
    super(props)
    this.toggleFilterMenu = this.toggleFilterMenu.bind(this)
  }
  toggleFilterMenu() {
    if (this.props.menus.filterTrailsMenu == true) {
      this.props.toggleMenus({
        trailsListMenu: this.props.menus.trailsListMenu,
        optionsMenu: this.props.menus.filterTrailsMenu,
        filterTrailsMenu: 'exiting'
      })
      setTimeout( () => this.props.toggleMenus({
        trailsListMenu: this.props.menus.trailsListMenu,
        optionsMenu: this.props.menus.optionsMenu,
        filterTrailsMenu: false
      }), 500)
    } else {
      this.props.toggleMenus({
        trailsListMenu: false,
        optionsMenu: false,
        filterTrailsMenu: true
      })
    }
  }
  render() {
    return (
      <React.Fragment>
        <button onClick={this.toggleFilterMenu} className={this.props.menus.filterTrailsMenu ? "active filters" : "filters"}>
          <img src="/static/images/menu/filter.svg" alt="Filter Trails"/>
          <p className='filter-trails-title'>Filter Trails</p>
        </button>
        {this.props.menus.filterTrailsMenu &&
          <FilterTrailsMenu toggleFilterMenu={this.toggleFilterMenu} menuState={this.props.menus.filterTrailsMenu} />
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
                display:block;
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

        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterTrails)
