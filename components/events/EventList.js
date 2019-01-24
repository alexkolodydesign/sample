import React from 'react';
import { BeatLoader } from 'react-spinners';
import dynamic from 'next/dynamic';
import EventsData from '../services/EventsData';
import EventListButton from './EventList.styles';
// Only load menu when user clicks
const EventListMenu = dynamic(
  () => import(/* webpackChunkName: "EventListMenu" */ './EventListMenu'),
  { ssr: false }
);

class EventList extends React.Component {
  state = { menu: false };

  toggleMenu = () => {
    const { menu } = this.state;
    if (menu === true) {
      this.setState({ menu: 'exiting' });
      setTimeout(() => this.setState({ menu: !menu }), 500);
    } else {
      this.setState({ menu: !menu });
    }
  };

  render() {
    const { menu } = this.state;
    return (
      <>
        <EventListButton
          type="button"
          onClick={this.toggleMenu}
          className={menu ? 'active' : null}
        >
          <img src="/static/images/menu/event_calendar.svg" alt="Event List" />
        </EventListButton>
        <EventsData>
          {({ loading, events }) => {
            if (loading) return <BeatLoader color="#0098e5" />;
            if (menu && events.length > 0)
              return (
                <EventListMenu
                  events={events}
                  toggleMenu={this.toggleMenu}
                  menuState={menu}
                />
              );
            return null;
          }}
        </EventsData>
      </>
    );
  }
}

export default EventList;
