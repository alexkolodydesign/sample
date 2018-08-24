// import { combineReducers } from 'redux'
import reduxWindow from 'redux-window'



// TODO: Is this sort of like how we would reset the Map and alter the zoom on screen size?
// getWidth(state) is from reduxWindow
//
// Current Error when using this
// Warning: Failed prop type: Invalid prop `zoom` of type `function` supplied to `GoogleMap`, expected `number`.
//
//
// export const zoomLevelOnReset = () => {
//   if (getWidth(state) >= 768 && getWidth(state) < 991) {
//     return 9
//   } else if (getWidth(state) >= 992 && getWidth(state) < 1500) {
//     return 10
//   } else if (getWidth(state) > 1500) {
//     return 11
//   } else {
//     return 8
//   }
// }



export const defaultState = {
  map: {
    activeRegions: {
      urban: true,
      canyon: true,
      mesa: true,
      alpine: true
    },
    metricType: "imperial",
    // zoom: zoomLevelOnReset,
    zoom: 8,
    gps: false,
    center: {lat: 37.327059, lng: -113.445826},
    filter: {
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
    }
  }
}

export const map = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_TRAIL_TYPE':
      const trailTypes = Object.assign({}, state.map.filter.trailType)
      trailTypes[action.trailType] = !trailTypes[action.trailType]
      return { map: { ...state.map, filter: { ...state.map.filter, trailType: trailTypes } } }
    case 'CHANGE_SEASON':
      return { map: { ...state.map, filter: { ...state.map.filter, season: action.filter } } }
    case 'CHANGE_TRAIL_TRAFFIC':
      return { map: { ...state.map, filter: { ...state.map.filter, trailTraffic: action.trailTraffic } } }
    case 'CHANGE_ROUTE_TYPE':
      return { map: { ...state.map, filter: { ...state.map.filter, routeType: action.routeType } } }
    case 'CHANGE_DIFFICULTY':
      return { map: { ...state.map, filter: { ...state.map.filter, difficulty: { ...state.map.filter.difficulty, default: action.difficulty } } } }
    case 'CHANGE_TRAIL_LENGTH':
      return { map: { ...state.map, filter: { ...state.map.filter, trailLength: action.trailLength } } }
    case 'CHANGE_METRIC_TYPE':
      return { map: { ...state.map, metricType: action.option } }
    case 'CHANGE_EXCLUDE':
      return { map: { ...state.map, filter: { ...state.map.filter, exclude: action.value } } }
    case 'GO_TO_SYSTEM':
      return { map: { ...state.map, zoom: action.location.zoom, center: action.location.center } }
    case 'TOGGLE_GPS':
      return { map: { ...state.map, gps: !state.map.gps } }
    case 'RESET_MAP':
      return defaultState
    case 'HIGHLIGHT_TRAIL':
      return { map: { ...state.map, highlightTrail: action.slug } }
    case 'TOGGLE_MENUS':
      return { map: { ...state.map, menus: action.menus } }
    default:
      return state
  }
}

export default map
