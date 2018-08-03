import Options from './Options'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {menu: false}
    this.toggleOptions = this.toggleOptions.bind(this)
  }
  toggleOptions() {
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
        <button className={this.state.menu ? "active settings" : "settings"} onClick={this.toggleMenu}>
          <img src="/static/images/menu/settings.svg" alt="Settings"/>
        </button>
        {this.state.menu ? <Options toggleOptions={this.toggleOptions} menuState={this.state.menu} /> : null}
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
