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
import { regionShape } from '../../lib/propTypes';
import RegionMarker from './RegionMarker';

class Region extends React.Component {
  render() {
    const { region, zoomLevel, firstTimeUser, highlightedRegion, zoom } = this.props;
    const { regionName, overlayImage, markerCoordinates } = region;
    const { google } = window;
    let coordinates;
    switch (region.regionName) {
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
      <React.Fragment>
        {zoomLevel < 12 && (
          <React.Fragment>
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
          </React.Fragment>
        )}
        {zoomLevel < 12 && <RegionMarker region={region} zoom={zoom} />}
        <style jsx>
          {`
            .explore {
              color: #3fa9f5;
              cursor: pointer;
              font-weight: 500;
            }
            .info_wrapper {
              display: block;
              min-width: 100%;
              overflow-x: hidden;
              img {
                max-width: 150px;
              }
            }

            @media screen and (min-width: 768px) {
              .info_wrapper {
                display: grid;
              }
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

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
