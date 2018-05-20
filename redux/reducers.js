// import { combineReducers } from 'redux'

export const defaultState = {
  map: {
    view: 'region',
    metricType: "imperial",
    filter: {
      trailType: {
        hiking: true,
        biking: true,
        atv: true,
        horseback: true
      },
      season: "",
      difficulty: {
        easy: true,
        moderate: true,
        hard: true
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
      const difficulty = Object.assign({},state.map.filter.difficulty)
      difficulty[action.difficulty] = !difficulty[action.difficulty]
      return { map: { ...state.map, filter: { ...state.map.filter, difficulty: difficulty } } }
    case 'CHANGE_TRAIL_LENGTH':
      return { map: { ...state.map, filter: { ...state.map.filter, trailLength: action.trailLength } } }
    case 'CHANGE_METRIC_TYPE':
      return { map: { ...state.map, metricType: action.option } }
    case 'CHANGE_EXCLUDE':
      return { map: { ...state.map, filter: { ...state.map.filter, exclude: action.value } } }
    default:
      return state
  }
}

export default map
