import { combineReducers } from 'redux';

export const defaultMapState = {
  map: {
    highlightedRegion: '',
    highlightedTrail: '',
    mapStyle: 'roadmap',
    metricType: 'imperial',
    system: '',
    zoom: 8,
    gps: false,
    center: { lat: 37.327059, lng: -113.445826 },
    filters: {
      regions: {
        urban: true,
        canyon: true,
        mesa: true,
        alpine: true,
        desert: true
      },
      trailType: {
        hiking: true,
        biking: true,
        ohv: true,
        equestrian: true
      },
      difficulty: {
        default: '',
        biking: '',
        hiking: '',
        ohv: '',
        equestrian: ''
      },
      trailLength: null,
      trailTraffic: '',
      routeType: '',
      exclude: ''
    },
    popupMenus: {
      trailPopup: false,
      regionPopup: false,
      activeRegionPopup: '',
      activeTrailPopup: '',
      menuCoords: {
        lat: null,
        lng: null
      }
    },
    firstTimeUser: true,
    showSEOMessage: true
  }
};

export const map = (state = defaultMapState, action) => {
  switch (action.type) {
    case 'CHANGE_TRAIL_TYPE': {
      const trailTypes = { ...state.filters.trailType };
      trailTypes[action.trailType] = !trailTypes[action.trailType];
      return { ...state, filters: { ...state.filters, trailType: trailTypes } };
    }
    case 'CHANGE_REGIONS': {
      const regions = { ...state.filters.regions };
      regions[action.regions] = !regions[action.regions];
      return { ...state, filters: { ...state.filters, regions } };
    }
    case 'CHANGE_SEASON':
      return { ...state, filters: { ...state.filters, season: action.filter } };
    case 'CHANGE_TRAIL_TRAFFIC':
      return {
        ...state,
        filters: { ...state.filters, trailTraffic: action.trailTraffic }
      };
    case 'CHANGE_ROUTE_TYPE':
      return { ...state, filters: { ...state.filters, routeType: action.routeType } };
    case 'CHANGE_DIFFICULTY':
      return {
        ...state,
        filters: {
          ...state.filters,
          difficulty: { ...state.filters.difficulty, default: action.difficulty }
        }
      };
    case 'CHANGE_TRAIL_LENGTH':
      return { ...state, filters: { ...state.filters, trailLength: action.trailLength } };
    case 'CHANGE_EXCLUDE':
      return { ...state, filters: { ...state.filters, exclude: action.value } };
    case 'CHANGE_METRIC_TYPE':
      return { ...state, metricType: action.option };
    case 'GO_TO_SYSTEM':
      return { ...state, zoom: action.location.zoom, center: action.location.center };
    case 'TOGGLE_GPS':
      return { ...state, gps: !state.gps };
    case 'RESET_MAP':
      return { ...defaultMapState.map, zoom: action.zoom };
    case 'RESET_REGIONS':
      return { ...state, highlightedRegion: '' };
    case 'HIGHLIGHT_TRAIL':
      return { ...state, highlightedTrail: action.slug };
    case 'HIGHLIGHT_REGION':
      return { ...state, highlightedRegion: action.name };
    case 'TOGGLE_POPUPMENUS':
      return { ...state, popupMenus: action.popups };
    case 'TOGGLE_FIRST_TIME_USER':
      return { ...state, firstTimeUser: action.status };
    case 'TOGGLE_SEO_MESSAGE':
      return { ...state, showSEOMessage: action.status };
    case 'CHANGE_MAP_STYLE':
      return { ...state, mapStyle: action.style };
    default:
      return state;
  }
};

export const menus = (
  state = { filterTrailsMenu: false, trailsListMenu: false, optionsMenu: false },
  action
) => {
  switch (action.type) {
    case 'TOGGLE_MENUS':
      return { ...state, ...action.menus };
    default:
      return state;
  }
};

export const reducers = combineReducers({ map, menus });

export default reducers;

// export default map
