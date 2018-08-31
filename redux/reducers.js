import { combineReducers } from 'redux'

export const defaultState = {
  map: {
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
    firstTimeUser: true
  }
}

export const map = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_TRAIL_TYPE':
      const trailTypes = Object.assign({}, state.map.filters.trailType)
      trailTypes[action.trailType] = !trailTypes[action.trailType]
      return { ...state, map: { ...state.map, filters: { ...state.map.filters, trailType: trailTypes } } }
    case 'CHANGE_SEASON':
      return { ...state, map: { ...state.map, filters: { ...state.map.filters, season: action.filter } } }
    case 'CHANGE_TRAIL_TRAFFIC':
      return { ...state, map: { ...state.map, filters: { ...state.map.filters, trailTraffic: action.trailTraffic } } }
    case 'CHANGE_ROUTE_TYPE':
      return { ...state, map: { ...state.map, filters: { ...state.map.filters, routeType: action.routeType } } }
    case 'CHANGE_DIFFICULTY':
      return { ...state, map: { ...state.map, filters: { ...state.map.filters, difficulty: { ...state.map.filter.difficulty, default: action.difficulty } } } }
    case 'CHANGE_TRAIL_LENGTH':
      return { ...state, map: { ...state.map, filters: { ...state.map.filters, trailLength: action.trailLength } } }
    case 'CHANGE_EXCLUDE':
      return { ...state, map: { ...state.map, filters: { ...state.map.filters, exclude: action.value } } }
    case 'CHANGE_METRIC_TYPE':
      return { ...state, map: { ...state.map, metricType: action.option } }
    case 'GO_TO_SYSTEM':
      return { ...state, map: { ...state.map, zoom: action.location.zoom, center: action.location.center } }
    case 'TOGGLE_GPS':
      return { ...state, map: { ...state.map, gps: !state.map.gps } }
    case 'RESET_MAP':
      return { ...state, map: {...defaultState.map, zoom: action.zoom} }
    case 'HIGHLIGHT_TRAIL':
      return { ...state, map: { ...state.map, highlightTrail: action.slug } }
    case 'TOGGLE_MENUS':
      return { ...state, map: { ...state.map, menus: action.menus } }
    case 'TOGGLE_FIRST_TIME_USER':
      return { ...state, map: { ...state.map, firstTimeUser: action.status } }
    case 'CHANGE_MAP_STYLE':
      return { ...state, map: { ...state.map, mapStyle: action.style } }
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
      matchingTrail.coordinates = action.data.coords || ''
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
