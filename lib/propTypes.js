import PropTypes from 'prop-types';

export const eventShape = PropTypes.shape({
  id: PropTypes.number,
  date: PropTypes.string,
  date_gmt: PropTypes.string,
  guid: PropTypes.shape({
    rendered: PropTypes.string
  }),
  modified: PropTypes.string,
  modified_gmt: PropTypes.string,
  slug: PropTypes.string,
  status: PropTypes.string,
  type: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.shape({
    rendered: PropTypes.string
  }),
  featured_media: PropTypes.number,
  template: PropTypes.string,
  custom_data: PropTypes.shape({
    featured_image_url: PropTypes.string,
    custom_data: PropTypes.shape({
      date_information: PropTypes.string,
      location: PropTypes.string,
      information: PropTypes.string,
      external_link: PropTypes.string,
      icon: PropTypes.string
    })
  })
});

export const eventsShape = PropTypes.arrayOf(eventShape);
