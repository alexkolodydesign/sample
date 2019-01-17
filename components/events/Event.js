import React from 'react';
import Link from 'next/link';
import { eventShape } from '../../utils/propTypes';
import EventStyles from './Event.styles';

const Event = ({ event }) => (
  <EventStyles className="event">
    <Link href={event.custom_data.custom_data.external_link}>
      <a href={event.custom_data.custom_data.external_link}>
        <img
          src={
            event.custom_data.featured_image_url
              ? event.custom_data.featured_image_url
              : 'https://placehold.it/75x75?text=Unavailable'
          }
          alt="unavailable"
        />
      </a>
    </Link>
    <div className="details">
      <h4>{event.title.rendered}</h4>
      <p>
        Date: <span>{event.custom_data.custom_data.date_information}</span>
      </p>
      <p>
        Location: <span>{event.custom_data.custom_data.location}</span>
      </p>
      <p>
        Info: <span>{event.custom_data.custom_data.information}</span>
      </p>
    </div>
  </EventStyles>
);

Event.propTypes = {
  event: eventShape.isRequired
};

export default Event;
