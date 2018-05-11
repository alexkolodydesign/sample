import { combineReducers } from 'redux'

export const defaultState = {
  map: {
    view: 'region',
    metricType: "miles",
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
    default:
      return state
  }
}

export default map
