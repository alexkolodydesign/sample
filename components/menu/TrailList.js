import TrailListMenu from './TrailListMenu'

export default class TrailList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {menu: false}
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  toggleMenu() {
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
        <button onClick={this.toggleMenu} className={this.state.menu ? "active" : null}>
          <img src="/static/images/menu/trail-list.svg" alt="Trail List"/>
          <p>Trail List</p>
        </button>
        {this.state.menu ? <TrailListMenu trails={this.props.system.trails} toggleMenu={this.toggleMenu} menuState={this.state.menu} /> : null}
        <style jsx>{`
          button {
            background: #4d4e4e;
            color: #fff;
            border: none;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 500ms;
            position: relative;
            &:hover {
              background: #262727;
              &.active {
                background: #3fa9f5;
              }
            }
            &.active {
              background: #3fa9f5;
            }
          }
          img {
            width: 4.5rem;
          }
          p {
            margin: 0;
            padding-right: 2.5rem;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
