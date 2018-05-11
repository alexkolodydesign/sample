import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'

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

export const initStore = (initialState = defaultState) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}
