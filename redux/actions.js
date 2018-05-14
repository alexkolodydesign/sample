import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'

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

export const changeTrailType = filter => async dispatch => dispatch({ type: 'CHANGE_TRAIL_TYPE', filter })
export const changeMetricType = option => async dispatch => dispatch({ type: 'CHANGE_METRIC_TYPE', option })
export const initStore = (initialState = defaultState) => createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
