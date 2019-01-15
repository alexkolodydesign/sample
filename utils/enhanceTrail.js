import axios from 'axios';
import { fitBounds } from 'google-map-react/utils';
import LatLng from 'google-map-react/lib/utils/lib_geo/lat_lng';
import LatLngBounds from 'google-map-react/lib/utils/lib_geo/lat_lng_bounds';

export const enhanceTrail = async (
  trail,
  updateConnectorTrailCoords,
  updateTrailCoords
) => {
  const enhancedTrail = { ...trail };
  // Add connector coordinates
  if (!enhancedTrail.connector_coordinates) {
    // If no connector coords then add empty array to redux store
    if (
      !enhancedTrail.custom_data.connectorTrailJSON ||
      !enhancedTrail.custom_data.connectorTrailJSON.url ||
      enhancedTrail.custom_data.connectorTrailJSON.url === undefined ||
      enhancedTrail.custom_data.connectorTrailJSON.url === 'undefined'
    ) {
      updateConnectorTrailCoords([], enhancedTrail.slug);
      enhancedTrail.connector_coordinates = [];
    } else {
      try {
        const {
          data: {
            trail: { coordinates: coords }
          }
        } = await axios.get(
          `/api/coordinates?url=${enhancedTrail.custom_data.connectorTrailJSON.url}`
        );
        updateConnectorTrailCoords(coords, enhancedTrail.slug);
        enhancedTrail.connector_coordinates = coords;
      } catch (e) {
        console.log(e);
      }
    }
  }
  // Add trail coordinates
  if (!enhancedTrail.coordinates) {
    // If no connector coords then add empty array to redux store
    if (
      !enhancedTrail.custom_data.jsonCoordinates ||
      !enhancedTrail.custom_data.jsonCoordinates.url ||
      enhancedTrail.custom_data.jsonCoordinates.url === undefined ||
      enhancedTrail.custom_data.jsonCoordinates.url === 'undefined'
    ) {
      updateTrailCoords([], enhancedTrail.slug);
      enhancedTrail.coordinates = [];
    } else {
      try {
        const {
          data: {
            trail: { coordinates: coords }
          }
        } = await axios.get(
          `/api/coordinates?url=${enhancedTrail.custom_data.jsonCoordinates.url}`
        );
        updateTrailCoords(coords, enhancedTrail.slug);
        enhancedTrail.coordinates = coords;
      } catch (e) {
        console.log(e);
      }
    }
  }
  return enhancedTrail;
};

export const setCenterAndZoom = (coords, connector_coordinates, trailhead) => {
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
