import { combineReducers } from 'redux'

export const defaultState = {
  map: {
    view: 'region'
  }
}

export const map = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default map
