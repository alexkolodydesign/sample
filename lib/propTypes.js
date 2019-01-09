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

export const regionShape = PropTypes.shape({
  regionName: PropTypes.string,
  markerIcon: PropTypes.string,
  markerCoordinates: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }),
  regionImage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  overlayImage: PropTypes.string,
  trailCount: PropTypes.number
});

export const regionsShape = PropTypes.arrayOf(regionShape);

export const difficultyShape = PropTypes.shape({
  default: PropTypes.string,
  biking: PropTypes.string,
  hiking: PropTypes.string,
  ohv: PropTypes.string,
  equestrian: PropTypes.string
});

export const filtersShape = PropTypes.shape({
  trailType: PropTypes.shape({
    hiking: PropTypes.bool,
    biking: PropTypes.bool,
    ohv: PropTypes.bool,
    equestrian: PropTypes.bool
  }),
  season: PropTypes.string,
  difficulty: difficultyShape,
  trailLength: PropTypes.number,
  trailTraffic: PropTypes.string,
  routeType: PropTypes.string,
  exclude: PropTypes.string
});

export const popupMenusShape = PropTypes.shape({
  trailPopup: PropTypes.bool,
  regionPopup: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  activeRegionPopup: PropTypes.string,
  activeTrailPopup: PropTypes.string,
  activePopupType: PropTypes.string
});

export const mapShape = PropTypes.shape({
  activeRegions: PropTypes.shape({
    urban: PropTypes.bool,
    canyon: PropTypes.bool,
    mesa: PropTypes.bool,
    alpine: PropTypes.bool
  }),
  highlightedRegion: PropTypes.string,
  mapStyle: PropTypes.string,
  metricType: PropTypes.string,
  zoom: PropTypes.number,
  gps: PropTypes.bool,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }),
  filters: filtersShape,
  menus: PropTypes.shape({
    filterTrailsMenu: PropTypes.bool,
    trailsListMenu: PropTypes.bool,
    optionsMenu: PropTypes.bool
  }),
  popupMenus: popupMenusShape,
  firstTimeUser: PropTypes.bool
});

export const valueLabelShape = PropTypes.shape({
  value: PropTypes.string,
  label: PropTypes.string
});

export const jsonCoordinatesShape = PropTypes.shape({
  ID: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
  filename: PropTypes.string,
  filesize: PropTypes.number,
  url: PropTypes.string,
  link: PropTypes.string,
  alt: PropTypes.string,
  author: PropTypes.string,
  description: PropTypes.string,
  caption: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.string,
  uploaded_to: PropTypes.number,
  date: PropTypes.string,
  modified: PropTypes.string,
  menu_order: PropTypes.number,
  mime_type: PropTypes.string,
  type: PropTypes.string,
  subtype: PropTypes.string,
  icon: PropTypes.string
});

export const pictureShape = PropTypes.shape({
  ID: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
  filename: PropTypes.string,
  filesize: PropTypes.number,
  url: PropTypes.string,
  link: PropTypes.string,
  alt: PropTypes.string,
  author: PropTypes.string,
  description: PropTypes.string,
  caption: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.string,
  uploaded_to: PropTypes.number,
  date: PropTypes.string,
  modified: PropTypes.string,
  menu_order: PropTypes.number,
  mime_type: PropTypes.string,
  type: PropTypes.string,
  subtype: PropTypes.string,
  icon: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  sizes: PropTypes.shape({
    thumbnail: PropTypes.string,
    'thumbnail-width': PropTypes.number,
    'thumbnail-height': PropTypes.number,
    medium: PropTypes.string,
    'medium-width': PropTypes.number,
    'medium-height': PropTypes.number,
    medium_large: PropTypes.string,
    'medium_large-width': PropTypes.number,
    'medium_large-height': PropTypes.number,
    large: PropTypes.string,
    'large-width': PropTypes.number,
    'large-height': PropTypes.number
  })
});

export const trailShape = PropTypes.shape({
  slug: PropTypes.string,
  title: PropTypes.shape({
    rendered: PropTypes.string
  }),
  custom_data: PropTypes.shape({
    zoomThreshold: PropTypes.string,
    defaultZoom: PropTypes.string,
    trailType: PropTypes.arrayOf(valueLabelShape),
    length: PropTypes.string,
    difficulty: PropTypes.shape({
      defaultDifficulty: valueLabelShape,
      ohvDifficulty: valueLabelShape,
      bikingDifficulty: valueLabelShape,
      hikingDifficulty: valueLabelShape,
      equestrianDifficulty: valueLabelShape
    }),
    highlights: PropTypes.string,
    otherHighlights: PropTypes.arrayOf(
      PropTypes.shape({
        highlight: PropTypes.string
      })
    ),
    availableSeasons: PropTypes.string,
    trailTraffic: valueLabelShape,
    entranceFee: PropTypes.string,
    routeType: valueLabelShape,
    trailSurface: PropTypes.string,
    suitability: PropTypes.oneOfType([
      PropTypes.arrayOf(valueLabelShape),
      PropTypes.string
    ]),
    black_out_date_range: PropTypes.string,
    recommendedUse: PropTypes.oneOfType([
      PropTypes.arrayOf(valueLabelShape),
      PropTypes.string
    ]),
    accessibility: PropTypes.oneOfType([
      PropTypes.arrayOf(valueLabelShape),
      PropTypes.string
    ]),
    similarTrails: PropTypes.string,
    trailsNearby: PropTypes.string,
    media: PropTypes.shape({
      videos: PropTypes.oneOfType([PropTypes.arrayOf(pictureShape), PropTypes.bool]),
      pictures: PropTypes.oneOfType([PropTypes.arrayOf(pictureShape), PropTypes.bool])
    }),
    jsonCoordinates: PropTypes.oneOfType([jsonCoordinatesShape, PropTypes.bool]),
    region: PropTypes.string,
    icons: PropTypes.string,
    trailhead_latitude: PropTypes.string,
    trailhead_longitude: PropTypes.string,
    directions: PropTypes.string
  })
});

export const trailsShape = PropTypes.arrayOf(trailShape);
