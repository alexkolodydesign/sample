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
        <button onClick={this.toggleMenu} className={this.state.menu ? "active trail_list" : "trail_list"}>
          <img src="/static/images/menu/trail-list.svg" alt="Trail List"/>
          <p>Trail List</p>
        </button>
        {this.state.menu && this.props.system ? <TrailListMenu trails={this.props.system.trails} toggleMenu={this.toggleMenu} menuState={this.state.menu} /> : null}
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
