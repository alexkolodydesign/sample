export const changeTrailType = trailType => dispatch =>
  dispatch({ type: 'CHANGE_TRAIL_TYPE', trailType });
export const changeTrailTraffic = trailTraffic => dispatch => {
  if (trailTraffic === 'clear')
    return dispatch({ type: 'CHANGE_TRAIL_TRAFFIC', trailTraffic: '' });
  return dispatch({ type: 'CHANGE_TRAIL_TRAFFIC', trailTraffic });
};
export const changeSeason = filter => dispatch => {
  if (filter === 'clear') return dispatch({ type: 'CHANGE_SEASON', filter: '' });
  return dispatch({ type: 'CHANGE_SEASON', filter });
};
export const changeRouteType = routeType => dispatch => {
  if (routeType === 'clear')
    return dispatch({ type: 'CHANGE_ROUTE_TYPE', routeType: '' });
  return dispatch({ type: 'CHANGE_ROUTE_TYPE', routeType });
};
export const changeExclude = exclude => dispatch => {
  const value = exclude === 'on';
  return dispatch({ type: 'CHANGE_EXCLUDE', value });
};
export const changeDifficulty = difficulty => dispatch => {
  if (difficulty === 'clear')
    return dispatch({ type: 'CHANGE_DIFFICULTY', difficulty: '' });
  return dispatch({ type: 'CHANGE_DIFFICULTY', difficulty });
};
export const changeTrailLength = trailLength => dispatch =>
  dispatch({ type: 'CHANGE_TRAIL_LENGTH', trailLength });
export const changeMetricType = option => dispatch =>
  dispatch({ type: 'CHANGE_METRIC_TYPE', option });
export const goToSystem = (zoom, center) => {
  const location = { zoom, center };
  return dispatch => dispatch({ type: 'GO_TO_SYSTEM', location });
};
export const toggleMenus = menus => dispatch => dispatch({ type: 'TOGGLE_MENUS', menus });
export const togglePopupMenus = popups => dispatch =>
  dispatch({ type: 'TOGGLE_POPUPMENUS', popups });
export const toggleGPS = () => dispatch => dispatch({ type: 'TOGGLE_GPS' });
export const resetMap = () => dispatch => {
  let zoom;
  if (window.innerWidth >= 768 && window.innerWidth < 991) zoom = 9;
  else if (window.innerWidth >= 992 && window.innerWidth < 1500) zoom = 10;
  else if (window.innerWidth > 1500) zoom = 11;
  else zoom = 8;
  return dispatch({ type: 'RESET_MAP', zoom });
};
export const highlightTrail = slug => dispatch =>
  dispatch({ type: 'HIGHLIGHT_TRAIL', slug });
export const highlightRegion = name => dispatch => {
  if (!name) return;
  dispatch({ type: 'HIGHLIGHT_REGION', name });
};
export const toggleFirstTimeUser = status => dispatch =>
  dispatch({ type: 'TOGGLE_FIRST_TIME_USER', status });
export const changeMapStyle = style => dispatch =>
  dispatch({ type: 'CHANGE_MAP_STYLE', style });
export const updateTrailCoords = (coords, slug) => dispatch => {
  const data = { coords, slug };
  return dispatch({ type: 'UPDATE_TRAIL_COORDINATES', data });
};
export const updateConnectorTrailCoords = (coords, slug) => dispatch => {
  const data = { coords, slug };
  return dispatch({ type: 'UPDATE_CONNECTOR_TRAIL_COORDINATES', data });
};
