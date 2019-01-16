import React from 'react';
import PropTypes from 'prop-types';
import { eventsShape } from '../../utils/propTypes';
import Event from './Event';

const EventListMenu = ({ toggleMenu, menuState, events }) => (
  <div className={menuState === 'exiting' ? 'exiting menu' : 'menu'}>
    <h3>Event List</h3>
    <button type="button" className="close" onClick={toggleMenu}>
      X
    </button>
    <div className="events">
      {events && events.map(event => <Event event={event} key={event.id} />)}
    </div>
    <style jsx>
      {`
        h3 {
          text-transform: uppercase;
          margin: 0 0 1rem 1rem;
          color: #fff;
        }
        .menu {
          padding: 1rem 0.5rem 2rem 0.5rem;
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
          background: #3fa9f5;
          height: 40rem;
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1.5rem;
          top: initial;

          z-index: 2;
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
          from {
            transform: translateY(25rem);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .events {
          background-image: linear-gradient(
              rgba(255, 255, 255, 0.98),
              rgba(255, 255, 255, 0.98)
            ),
            url(/static/images/background-pattern.svg);
          padding: 0 0.5rem;
          height: calc(100% - 5rem);
          overflow-y: scroll;
        }
        .close {
          color: #3fa9f5;
          background: #fff;
          border: none;
          position: absolute;
          right: 3rem;
          top: 1rem;
          padding: 0.5rem 0.5rem;
          border-radius: 100%;
          line-height: 1rem;
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
            left: 1rem;
            width: 40rem;
            bottom: 9rem;
          }
        }
      `}
    </style>
  </div>
);

EventListMenu.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  menuState: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  events: eventsShape.isRequired
};

export default EventListMenu;
