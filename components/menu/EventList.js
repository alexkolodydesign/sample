import EventListMenu from './EventListMenu'

export default class EventList extends React.Component {
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
    // console.log("EventList: ", this.props)
    return (
      <React.Fragment>
        <button onClick={this.toggleMenu} className={this.state.menu ? "active" : null}>
          <img src="/static/images/menu/event_calendar.svg" alt="Event List"/>
        </button>
        {this.state.menu && this.props.events ? <EventListMenu events={this.props.events} toggleMenu={this.toggleMenu} menuState={this.state.menu} /> : null}
        <style jsx>{`
          button {
            padding: 2px;
            background: #3fa9f5;
            color: #fff;
            border: none;
            border-radius: 50%;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 500ms;
            position: absolute;
            top: 50px;
            left: 15px;
            z-index: 2;
            width: 62px;
            height: 62px;
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
            padding: 2px;
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
