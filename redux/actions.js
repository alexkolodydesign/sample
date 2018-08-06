import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'
import {defaultState} from './reducers'

export const changeTrailType = trailType => dispatch => dispatch({ type: 'CHANGE_TRAIL_TYPE', trailType })
export const changeTrailTraffic = trailTraffic => dispatch => {
  if (trailTraffic == "clear") trailTraffic = ""
  return dispatch({ type: 'CHANGE_TRAIL_TRAFFIC', trailTraffic })
}
export const changeSeason = filter => dispatch => {
  if (filter == "clear") filter = ""
  return dispatch({ type: 'CHANGE_SEASON', filter })
}
export const changeRouteType = routeType => dispatch => {
  if (routeType == "clear") routeType = ""
  return dispatch({ type: 'CHANGE_ROUTE_TYPE', routeType })
}
export const changeExclude = exclude => dispatch => {
  const value = exclude == "on" ? true : false
  return dispatch({ type: 'CHANGE_EXCLUDE', value })
}
export const changeDifficulty = difficulty => dispatch => {
  if (difficulty == "clear") difficulty = ""
  return dispatch({ type: 'CHANGE_DIFFICULTY', difficulty })
}
export const changeTrailLength = trailLength => dispatch => dispatch({ type: 'CHANGE_TRAIL_LENGTH', trailLength })
export const changeMetricType = option => dispatch => dispatch({ type: 'CHANGE_METRIC_TYPE', option })
export const goToSystem = (zoom, center) => {
  const location = {zoom, center}
  return dispatch => dispatch({ type: 'GO_TO_SYSTEM', location })
}
export const toggleGPS = () => dispatch => dispatch({ type: 'TOGGLE_GPS' })
export const resetMap = () => dispatch => dispatch({ type: 'RESET_MAP' })
export const highlightTrail = slug => dispatch => dispatch({ type: 'HIGHLIGHT_TRAIL' , slug })
export const initStore = (initialState = defaultState) => createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
