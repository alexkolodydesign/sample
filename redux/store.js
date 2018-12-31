import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducers, defaultMapState } from './reducers';

export const initStore = (isFirstTimeUser, initialState = defaultMapState) => {
  initialState.map.firstTimeUser = isFirstTimeUser;
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};

export default initStore;
