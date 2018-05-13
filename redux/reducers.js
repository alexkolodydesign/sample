// import { combineReducers } from 'redux'

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
    case 'CHANGE_TRAIL_TYPE':
      const filterState = Object.assign({
        map: { filter: action.filter }
      }, ...state)
      return filterState
    default:
      return state
  }
}

export default map
