import FilterTrailsMenu from './FilterTrailsMenu'

export default class FilterTrails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {menu: false}
    this.toggleFilterMenu = this.toggleFilterMenu.bind(this)
  }
  toggleFilterMenu() {
    if (this.state.menu == true) {
      this.setState({menu: "exiting"});
      setTimeout( () => this.setState({menu: !this.state.menu}), 500)
    } else {
      this.setState({menu: !this.state.menu})
    }
  }
  render() {
    return (
      <React.Fragment>
        <button onClick={this.toggleFilterMenu} className={this.state.menu ? "active filters" : "filters"}>
          <img src="/static/images/menu/filter.svg" alt="Filter Trails"/>
          <p className='filter-trails-title'>Filter Trails</p>
        </button>
        {this.state.menu ? <FilterTrailsMenu toggleFilterMenu={this.toggleFilterMenu} menuState={this.state.menu} /> : null}
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
