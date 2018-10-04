import { combineReducers } from 'redux'

export const defaultState = {
  activeRegions: {
    urban: true,
    canyon: true,
    mesa: true,
    alpine: true
  },
  mapStyle: "roadmap",
  metricType: "imperial",
  zoom: 8,
  gps: false,
  center: {lat: 37.327059, lng: -113.445826},
  filters: {
    trailType: {
      hiking: true,
      biking: true,
      ohv: true,
      equestrian: true
    },
    season: "",
    difficulty: {
      default: "",
      biking: "",
      hiking: "",
      ohv: "",
      equestrian: ""
    },
    trailLength: null,
    trailTraffic: "",
    routeType: "",
    exclude: ""
  },
  menus: {
    filterTrailsMenu: false,
    trailsListMenu: false,
    optionsMenu: false
  },
  popupMenus: {
    trailPopup: false,
    regionPopup: false,
    activeRegionPopup: '',
    activeTrailPopup: '',
    activePopupType: ''
  },
  firstTimeUser: true
}

export const map = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_TRAIL_TYPE':
      const trailTypes = Object.assign({}, state.filters.trailType)
      trailTypes[action.trailType] = !trailTypes[action.trailType]
      return { ...state, filters: { ...state.filters, trailType: trailTypes } }
    case 'CHANGE_SEASON':
      return { ...state, filters: { ...state.filters, season: action.filter } }
    case 'CHANGE_TRAIL_TRAFFIC':
      return { ...state, filters: { ...state.filters, trailTraffic: action.trailTraffic } }
    case 'CHANGE_ROUTE_TYPE':
      return { ...state, filters: { ...state.filters, routeType: action.routeType } }
    case 'CHANGE_DIFFICULTY':
      return { ...state, filters: { ...state.filters, difficulty: { ...state.filters.difficulty, default: action.difficulty } } }
    case 'CHANGE_TRAIL_LENGTH':
      return { ...state, filters: { ...state.filters, trailLength: action.trailLength } }
    case 'CHANGE_EXCLUDE':
      return { ...state, filters: { ...state.filters, exclude: action.value } }
    case 'CHANGE_METRIC_TYPE':
      return { ...state, metricType: action.option }
    case 'GO_TO_SYSTEM':
      return { ...state, zoom: action.location.zoom, center: action.location.center }
    case 'TOGGLE_GPS':
      return { ...state, gps: !state.gps }
    case 'RESET_MAP':
      return { ...defaultState, zoom: action.zoom }
    case 'HIGHLIGHT_TRAIL':
      return { ...state, highlightTrail: action.slug }
    case 'HIGHLIGHT_REGION':
      return { ...state, highlightRegion: action.name }
    case 'TOGGLE_MENUS':
      return { ...state, menus: action.menus }
    case 'TOGGLE_POPUPMENUS':
      return { ...state, popupMenus: action.popups }
    case 'TOGGLE_FIRST_TIME_USER':
      return { ...state, firstTimeUser: action.status }
    case 'CHANGE_MAP_STYLE':
      return { ...state, mapStyle: action.style }
    default:
      return state
  }
}

export const trails = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_TRAIL_COORDINATES':
      const newState = [...state]
      let matchingTrail = newState.find(trail => {
        if (trail.slug == action.data.slug) return true
      })
      if (matchingTrail) matchingTrail.coordinates = action.data.coords || ''
      else newState.push({ slug: action.data.slug, coordinates: action.data.coords })
      return newState
    default:
      return state
  }
}

const rootReducer = combineReducers({
  map,
  trails
})

export default rootReducer

// export default map
