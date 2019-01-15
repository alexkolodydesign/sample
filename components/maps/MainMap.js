import React from 'react';
import { GoogleMap } from 'react-google-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import filterActions from '../../utils/filterActions';
import Region from '../regions/Region';
import RegionTrail from '../regions/RegionTrail';
import UserLocation from '../gps/UserLocation';
import RegionsData from '../services/RegionsData';
import { mapShape, trailsShape } from '../../utils/propTypes';

class Map extends React.Component {
  static washington_map = React.createRef();

  componentDidMount = () => {
    const { goTo, map } = this.props;
    if (window.innerWidth >= 768 && window.innerWidth < 991) goTo(9, map.center);
    else if (window.innerWidth >= 992 && window.innerWidth < 1500) goTo(10, map.center);
    else if (window.innerWidth > 1500) goTo(11, map.center);
    else goTo(8, map.center);
  };

  zoom = (zoom, center, regionName) => {
    const { highlight, goTo } = this.props;
    highlight(regionName);
    goTo(zoom, center);
  };

  render() {
    const { regions, map, trails, firstTimeUser } = this.props;
    const zoomState = this.zoom;
    const zoomLevel = map.zoom;
    const filteredTrails = filterActions(trails, map.filters, zoomLevel);
    const { google } = window;
    return (
      <GoogleMap
        zoom={map.zoom}
        center={map.center}
        // eslint-disable-next-line react/jsx-no-bind
        onZoomChanged={function zoomChange() {
          zoomState(this.getZoom(), null);
        }}
        options={{
          mapTypeId: map.mapStyle,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_BOTTOM
          },
          fullscreenControl: false
        }}
        defaultOptions={{
          streetViewControl: false
        }}
        ref={this.washington_map}
      >
        {map.gps && <UserLocation />}
        {firstTimeUser === false && (
          <>
            {filteredTrails.map(trail => (
              <RegionTrail trail={trail} key={trail.slug} />
            ))}
          </>
        )}
        <RegionsData>
          {regions =>
            regions.map(region => (
              <Region
                region={region}
                key={region.regionName}
                zoom={this.zoom}
                zoomLevel={map.zoom}
                firstTimeUser={firstTimeUser}
              />
            ))
          }
        </RegionsData>
      </GoogleMap>
    );
  }
}

// Redux
const mapStateToProps = state => ({
  map: state.map,
  trailCoordinates: state.trailCoordinates,
  firstTimeUser: state.map.firstTimeUser,
  trails: state.trails
});
const mapDispatchToProps = dispatch => ({
  goTo: (zoom, center) => {
    const location = { zoom, center };
    return dispatch({ type: 'GO_TO_SYSTEM', location });
  },
  highlight: name => {
    if (name) return dispatch({ type: 'HIGHLIGHT_REGION', name });
    return null;
  }
});

Map.propTypes = {
  map: mapShape.isRequired,
  highlight: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  trails: trailsShape.isRequired,
  firstTimeUser: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
