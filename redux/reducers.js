// import { combineReducers } from 'redux'

export const defaultState = {
  map: {
    view: 'region',
    metricType: "imperial",
    zoom: 8,
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
    default:
      return state
  }
}

export default map
