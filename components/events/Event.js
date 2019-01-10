import React from 'react';
import Link from 'next/link';
import { eventShape } from '../../utils/propTypes';

const Event = ({ event }) => (
  <div className="event">
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
    <style jsx>
      {`
        .event {
          background: #eee;
          display: grid;
          grid-template-columns: 7.5rem 1fr;
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
          a {
            max-width: 100%;
          }
          img {
            max-width: 100%;
            height: auto;
          }
        }
        .details {
          padding: 0.25rem 2rem 1rem 1rem;
          h4 {
            margin: 0;
            font-weight: 700;
            a {
              text-decoration: none;
              color: inherit;
            }
          }
          p {
            margin: 0;
            font-weight: 500;
          }
          p span {
            font-weight: 100;
          }
        }
        .inactive {
          opacity: 0.25;
          filter: grayscale();
        }
        @keyframes slideUp {
          from {
            transform: translateY(25rem);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}
    </style>
  </div>
);

Event.propTypes = {
  event: eventShape.isRequired
};

export default Event;
