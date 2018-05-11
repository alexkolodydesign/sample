import { combineReducers } from 'redux'

export const defaultState = {
  map: {
    view: 'region',
    metricType: "miles"
  }
}

export const map = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default map
