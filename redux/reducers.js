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
      trailLength: {
        short: true,
        moderate: true,
        long: true
      },
      trailTraffic: {
        sparse: true,
        comfortable: true,
        crowded: true
      },
      routeType: {
        loop: true,
        nonLoop: true
      }
    }
  }
}

export const map = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_TRAIL_TYPE':
      return { map: { ...state.map, filter: { ...state.map.filter, trailType: action.filter } } }
    case 'CHANGE_SEASON':
      return { map: { ...state.map, filter: { ...state.map.filter, season: action.filter } } }
    case 'CHANGE_DIFFICULTY':
      const difficulty = Object.assign({},state.map.filter.difficulty)
      difficulty[action.difficulty] = !difficulty[action.difficulty]
      return { map: { ...state.map, filter: { ...state.map.filter, difficulty: difficulty } } }
    case 'CHANGE_METRIC_TYPE':
      return { map: { ...state.map, metricType: action.option } }
    default:
      return state
  }
}

export default map
