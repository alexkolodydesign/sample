import { fitBounds } from 'google-map-react/utils';
import LatLng from 'google-map-react/lib/utils/lib_geo/lat_lng';
import LatLngBounds from 'google-map-react/lib/utils/lib_geo/lat_lng_bounds';

const setCenterAndZoom = (coords, connector_coordinates, trailhead) => {
  // Make new bounds
  const newBounds = new LatLngBounds();
  // Add LatLng points to the new bounding area
  coords.forEach(bound => {
    if (Array.isArray(bound)) {
      bound.forEach(point => {
        newBounds.extend(new LatLng(point.lat, point.lng));
      });
    } else if (bound !== null) {
      newBounds.extend(new LatLng(bound.lat, bound.lng));
    }
  });
  // add trailhead point if available
  if (trailhead) {
    newBounds.extend(new LatLng(trailhead.lat, trailhead.lng));
  }
  // Get the new center and zoom from new bounds
  const fit = fitBounds(
    { nw: newBounds.getNorthWest(), se: newBounds.getSouthEast() },
    { width: 820, height: 400 }
  );
  // Update state for map
  return { zoom: fit.zoom, center: fit.center, mapIsCentered: true };
};

export default setCenterAndZoom;
