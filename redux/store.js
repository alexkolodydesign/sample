import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducers, defaultMapState } from './reducers';

export const initStore = ({
  firstTimeUser,
  regions,
  trails,
  initialState = defaultMapState
}) => {
  const state = {
    ...initialState,
    map: { ...initialState.map, firstTimeUser },
    trails,
    regions
  };
  return createStore(
    reducers,
    state,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};

export default initStore;
