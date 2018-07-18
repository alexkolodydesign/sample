import Link from 'next/link'

class EventListMenu extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props)
    return (
      <div className={this.props.menuState == "exiting" ? "exiting menu" : "menu"}>
        <h3>Event List</h3>
        <div className="close" onClick={this.props.toggleMenu}>X</div>
        <div className="events">
          {this.props.events.map( (event, k) => <Event event={event} key={k} /> )}
        </div>
        <style jsx>{`
          h3 {text-transform: uppercase; margin: 0 0 0 1rem; color: #fff;}
          .menu {
            padding: 1rem 0.5rem 2rem 0.5rem;
            border-top-left-radius: 1rem;
            border-top-right-radius: 1rem;
            background: #3fa9f5;
            height: 40rem;
            position: absolute;
            left: -2rem;
            right: -2rem;
            bottom: -1.5rem;
            top: initial;

            z-index: 10;
            overflow: hidden;
            animation-name: slideUp;
            animation-duration: 500ms;
            &.exiting {
              transition: 500ms;
              transform: translateY(25rem);
              opacity: 0;
            }
          }
          @keyframes slideUp {
            from {transform: translateY(25rem);opacity: 0;}
            to {transform: translateY(0); opacity: 1;}
          }
          .events {
            background-image: linear-gradient(rgba(255,255,255,0.98), rgba(255,255,255,0.98)), url(/static/images/background-pattern.svg);
            padding: 0 0.5rem;
            height: calc(100% - 5rem);
            overflow-y: scroll;
          }
          .close {
            color: #3fa9f5;
            background: #fff;
            position: absolute;
            right: 3rem;
            top: 1rem;
            padding: .5rem 0.5rem;
            border-radius: 100%;
            line-height: 1.0rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 500ms;
            opacity: 0.5;
            &:hover {
              opacity: 1;
            }
          }
          @media screen and (min-width: 768px) {
            .menu {
              left: 0;
              top: -43rem;
              z-index: -1;
              width: 30rem;
            }
          }
        `}</style>
      </div>
    )
  }
}

const Event = props =>
  <div className="event">
    <Link href={props.event.custom_data.custom_data.external_link}><a>
      <img src={props.event.custom_data.featured_image_url ? props.event.custom_data.featured_image_url : "https://placehold.it/75x75?text=Unavailable"} alt="unavailable"/>
    </a></Link>
    <div className="details">
      <h4>{props.event.title.rendered}</h4>
      <p>Date: <span>{props.event.custom_data.custom_data.date_information}</span></p>
      <p>Location: <span>{props.event.custom_data.custom_data.location}</span></p>
      <p>Info: <span>{props.event.custom_data.custom_data.information}</span></p>
    </div>
    <style jsx>{`
      .event {
        background: #eee;
        display: grid;
        grid-template-columns: 7.5rem 1fr 8rem;
        margin: 1rem 0;
        animation-fill-mode: forwards;
        &:nth-child(1) {
          animation-name: slideUp;
          animation-duration: 500ms;
          animation-delay: 50ms;
        }
        &:nth-child(2) {
          animation-name: slideUp;
          animation-duration: 500ms;
          animation-delay: 100ms;
        }
        &:nth-child(3) {
          animation-name: slideUp;
          animation-duration: 500ms;
          animation-delay: 200ms;
        }
        img {
          max-width: 100%;
          height: auto;
        }
      }
      .details {
        padding: 0.25rem 2rem 1rem 1rem;
        h4 {
          margin: 0; font-weight: 700;
          a {
            text-decoration: none;
            color: inherit;
          }
        }
        p {margin: 0; font-weight: 500;}
        p span {font-weight: 100;}
      }
      .inactive {
        opacity: 0.25;
        filter: grayscale();
      }
      @keyframes slideUp {
        from {transform: translateY(25rem);opacity: 0;}
        to {transform: translateY(0); opacity: 1;}
      }
    `}</style>
  </div>



export default EventListMenu
