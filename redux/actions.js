import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'

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

export const changeTrailType = trailType => async dispatch => dispatch({ type: 'CHANGE_TRAIL_TYPE', trailType })
export const changeTrailTraffic = trailTraffic => async dispatch => {
  if (trailTraffic == "clear") trailTraffic = ""
  return dispatch({ type: 'CHANGE_TRAIL_TRAFFIC', trailTraffic })
}
export const changeSeason = filter => async dispatch => {
  if (filter == "clear") filter = ""
  return dispatch({ type: 'CHANGE_SEASON', filter })
}
export const changeRouteType = routeType => async dispatch => {
  if (routeType == "clear") routeType = ""
  return dispatch({ type: 'CHANGE_ROUTE_TYPE', routeType })
}
export const changeExclude = exclude => async dispatch => {
  const value = exclude == "on" ? true : false
  return dispatch({ type: 'CHANGE_EXCLUDE', value })
}
export const changeDifficulty = difficulty => async dispatch => dispatch({ type: 'CHANGE_DIFFICULTY', difficulty })
export const changeTrailLength = trailLength => async dispatch => dispatch({ type: 'CHANGE_TRAIL_LENGTH', trailLength })
export const changeMetricType = option => async dispatch => dispatch({ type: 'CHANGE_METRIC_TYPE', option })
export const initStore = (initialState = defaultState) => createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
