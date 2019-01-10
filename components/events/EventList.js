import React from 'react';
import dynamic from 'next/dynamic';
// Only load menu when user clicks
const EventListMenu = dynamic(() => import('./EventListMenu'), { ssr: false });

class EventList extends React.Component {
  state = { loading: true, events: [] };

  toggleMenu = () => {
    const { menu } = this.state;
    if (menu === true) {
      this.setState({ menu: 'exiting' });
      setTimeout(() => this.setState({ menu: !menu }), 500);
    } else {
      this.setState({ menu: !menu });
    }
  };

  componentDidMount = () => {
    this.getEvents();
  };

  getEvents = async () => {
    const events_data = await fetch('/api/washco_event');
    const events = await events_data.json();
    this.setState({ events, loading: false });
  };

  render() {
    const { loading, menu, events } = this.state;
    if (loading) return <></>;
    return (
      <>
        <button
          type="button"
          onClick={this.toggleMenu}
          className={menu ? 'active' : null}
        >
          <img src="/static/images/menu/event_calendar.svg" alt="Event List" />
          <style jsx="true">
            {`
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
                  display: flex;
                }
                p {
                  display: block;
                }
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
        {menu && events.length > 0 ? (
          <EventListMenu events={events} toggleMenu={this.toggleMenu} menuState={menu} />
        ) : null}
      </>
    );
  }
}

export default EventList;
