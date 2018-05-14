// import { combineReducers } from 'redux'

export const defaultState = {
  map: {
    view: 'region',
    metricType: "imperial",
    filter: {
      hiking: true,
      biking: true,
      atv: true,
      horseback: true
    }
  }
}

export const map = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_TRAIL_TYPE':
      return { map: { ...state.map, filter: action.filter } }
    case 'CHANGE_METRIC_TYPE':
      console.log("Reducer: ", action)
      return { map: { ...state.map, metricType: action.option } }
    default:
      return state
  }
}

export default map
