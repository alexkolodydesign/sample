import React from 'react';
import { Polygon, GroundOverlay } from 'react-google-maps';
import PropTypes from 'prop-types';
import LatLng from 'google-map-react/lib/utils/lib_geo/lat_lng';
import LatLngBounds from 'google-map-react/lib/utils/lib_geo/lat_lng_bounds';
import { connect } from 'react-redux';
import alpineCoordinates from '../../data/alpine-coordinates';
import desertCoordinates from '../../data/desert-coordinates';
import canyonCoordinates from '../../data/canyon-coordinates';
import mesaCoordinates from '../../data/mesa-coordinates';
import urbanCoordinates from '../../data/urban-coordinates';
import { regionShape } from '../../utils/propTypes';
import RegionMarker from './RegionMarker';

const Region = ({ region, zoomLevel, firstTimeUser, highlightedRegion, zoom }) => {
  const { regionName, overlayImage, markerCoordinates } = region;
  const { google } = window;
  let coordinates;
  switch (regionName) {
    case 'Alpine':
      coordinates = alpineCoordinates;
      break;
    case 'Desert':
      coordinates = desertCoordinates;
      break;
    case 'Canyon':
      coordinates = canyonCoordinates;
      break;
    case 'Mesa':
      coordinates = mesaCoordinates;
      break;
    case 'Urban':
      coordinates = urbanCoordinates;
      break;
    default:
      coordinates = [];
  }
  // Make new bounds
  const newBounds = new LatLngBounds();
  // Add LatLng points to the new bounding area
  coordinates.forEach(bound => newBounds.extend(new LatLng(bound.lat, bound.lng)));
  if (!coordinates) return null;
  return (
    <>
      {zoomLevel < 12 && (
        <>
          {window && window.matchMedia('(min-width: 992px)').matches && (
            <GroundOverlay
              defaultUrl={overlayImage}
              defaultBounds={
                new google.maps.LatLngBounds(
                  newBounds.getSouthWest(),
                  newBounds.getNorthEast()
                )
              }
              defaultOpacity={firstTimeUser === true ? 1 : 0}
            />
          )}
          <Polygon
            paths={coordinates}
            options={{
              strokeColor: highlightedRegion === regionName ? '#000' : '#FFF',
              strokeOpacity: 1,
              strokeWeight: 3,
              fillColor: '#ffffff',
              fillOpacity: 0,
              clickable: highlightedRegion !== regionName,
              zIndex: highlightedRegion === regionName ? '2' : '1'
            }}
            // eslint-disable-next-line react/jsx-no-bind
            onMouseOver={function regionHoverOver() {
              this.setOptions({ fillOpacity: 0.5 });
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            // eslint-disable-next-line react/jsx-no-bind
            onMouseOut={function regionHoverOut() {
              this.setOptions({ fillOpacity: 0 });
            }}
            onClick={() =>
              zoom(
                11.75,
                { lat: markerCoordinates.lat, lng: markerCoordinates.lng },
                regionName
              )
            }
          />
        </>
      )}
      {zoomLevel < 12 && <RegionMarker region={region} zoom={zoom} />}
    </>
  );
};

Region.propTypes = {
  region: regionShape.isRequired,
  zoomLevel: PropTypes.number.isRequired,
  zoom: PropTypes.func.isRequired,
  firstTimeUser: PropTypes.bool.isRequired,
  highlightedRegion: PropTypes.string.isRequired
};

// Redux
const mapStateToProps = state => ({
  highlightedRegion: state.map.highlightedRegion
});

export default connect(
  mapStateToProps,
  null
)(Region);
