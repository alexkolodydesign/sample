import React from 'react';
import PropTypes from 'prop-types';
import { eventsShape } from '../../utils/propTypes';
import Event from './Event';
import EventListMenuStyles from './EventListMenu.styles';

const EventListMenu = ({ toggleMenu, menuState, events }) => (
  <EventListMenuStyles className={menuState === 'exiting' ? 'exiting menu' : 'menu'}>
    <h3>Event List</h3>
    <button type="button" className="close" onClick={toggleMenu}>
      X
    </button>
    <div className="events">
      {events && events.map(event => <Event event={event} key={event.id} />)}
    </div>
  </EventListMenuStyles>
);

EventListMenu.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  menuState: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  events: eventsShape.isRequired
};

export default EventListMenu;
