import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducers, defaultMapState } from './reducers';

export const initStore = (initialState = defaultMapState) => {
  const state = { ...initialState };
  const store = createStore(
    reducers,
    state,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
  return store;
};

export default initStore;
