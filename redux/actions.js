import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'
import {defaultState} from './reducers'

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
export const changeDifficulty = difficulty => async dispatch => {
  if (difficulty == "clear") difficulty = ""
  return dispatch({ type: 'CHANGE_DIFFICULTY', difficulty })
}
export const changeTrailLength = trailLength => async dispatch => dispatch({ type: 'CHANGE_TRAIL_LENGTH', trailLength })
export const changeMetricType = option => async dispatch => dispatch({ type: 'CHANGE_METRIC_TYPE', option })
export const goToSystem = (zoom, center) => {
  const location = {zoom, center}
  return async dispatch => dispatch({ type: 'GO_TO_SYSTEM', location })
}
export const toggleGPS = () => async dispatch => dispatch({ type: 'TOGGLE_GPS' })
export const initStore = (initialState = defaultState) => createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
