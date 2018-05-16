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

export const changeTrailType = filter => async dispatch => dispatch({ type: 'CHANGE_TRAIL_TYPE', filter })
export const changeSeason = filter => async dispatch => {
  if (filter == "Clear") filter = ""
  return dispatch({ type: 'CHANGE_SEASON', filter })
}
export const changeDifficulty = difficulty => async dispatch => dispatch({ type: 'CHANGE_DIFFICULTY', difficulty })
export const changeTrailLength = trailLength => async dispatch => dispatch({ type: 'CHANGE_TRAIL_LENGTH', trailLength })
export const changeMetricType = option => async dispatch => dispatch({ type: 'CHANGE_METRIC_TYPE', option })
export const initStore = (initialState = defaultState) => createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
