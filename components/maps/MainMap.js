import React from 'react';
import { GoogleMap } from 'react-google-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { goToSystem, highlightRegion } from '../../redux/actions';
import filterActions from '../../redux/filterActions';
import Region from '../regions/Region';
import RegionTrail from '../regions/RegionTrail';
import UserLocation from '../gps/UserLocation';
import { regionsShape, mapShape, trailsShape } from '../../lib/propTypes';

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
    const { regions, map, trails, firstTimeUser, metricType } = this.props;
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
              <RegionTrail trail={trail} key={trail.slug} metricType={metricType} />
            ))}
          </>
        )}
        {regions.map(region => (
          <Region
            region={region}
            key={region.regionName}
            zoom={this.zoom}
            zoomLevel={map.zoom}
            firstTimeUser={firstTimeUser}
          />
        ))}
      </GoogleMap>
    );
  }
}

// Redux
const mapStateToProps = state => ({
  map: state.map,
  trailCoordinates: state.trailCoordinates,
  metricType: state.map.metricType,
  firstTimeUser: state.map.firstTimeUser
});
const mapDispatchToProps = dispatch => ({
  goTo: (zoom, center) => {
    dispatch(goToSystem(zoom, center));
  },
  highlight: name => {
    dispatch(highlightRegion(name));
  }
});

Map.propTypes = {
  regions: regionsShape.isRequired,
  map: mapShape.isRequired,
  highlight: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  trails: trailsShape.isRequired,
  firstTimeUser: PropTypes.bool.isRequired,
  metricType: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
