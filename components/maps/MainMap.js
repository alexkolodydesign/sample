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

  state = { activeRegion: {}, activeTrail: {} };

  componentDidMount = () => {
    const { goToSystem: goTo, map } = this.props;
    if (window.innerWidth >= 768 && window.innerWidth < 991) {
      goTo(9, map.center);
    } else if (window.innerWidth >= 992 && window.innerWidth < 1500) {
      goTo(10, map.center);
    } else if (window.innerWidth > 1500) {
      goTo(11, map.center);
    } else {
      goTo(8, map.center);
    }
  };

  onRegionToggle = region => {
    const { activeTrail, activeRegion } = this.state;
    // if there is an active trail, close it
    if (activeTrail.props) {
      activeTrail.toggleMenu(); // this closes the current popup
      this.setState({ activeTrail: {} });
    }

    // if new is same as current, close
    if (
      activeRegion.props &&
      activeRegion.props.region.regionName === region.props.region.regionName
    ) {
      region.toggleMenu();
      this.setState({ activeRegion: {} });
    }
    // if current is set, but is not the one clicked, close the current and set to new
    else if (activeRegion && activeRegion.state) {
      activeRegion.toggleMenu(); // this closes the current popup
      activeRegion.togglePopupMenu(region.regionName); // this will compare the current active to the new and close if needed
      this.setState({ activeRegion: region });
      activeRegion.toggleMenu(); // this closes the current popup
    }
    // else there is none set, so start from beginning
    else {
      this.setState({ activeRegion: region });
      activeRegion.toggleMenu(); // this closes the current popup
    }
  };

  zoom = (zoom, center, regionName) => {
    const { highlightRegion: highlight, goTo } = this.props;
    highlight(regionName);
    goTo(zoom, center);
  };

  onTrailToggle = (trail, coordinate) => {
    const { activeRegion, activeTrail } = this.state;
    // if there is an active region popup, close it
    if (activeRegion.props) {
      activeRegion.toggleMenu(); // this closes the current popup
      this.setState({ activeRegion: {} });
    }
    // if new is same as current, close
    if (activeTrail.props && activeTrail.props.trail.slug === trail.props.trail.slug) {
      trail.toggleMenu(coordinate);
      this.setState({ activeTrail: {} });
    }
    // if current is set, but is not the one clicked, close the current and set to new
    else if (activeTrail && activeTrail.state) {
      activeTrail.toggleMenu(coordinate); // this closes the current popup
      activeTrail.togglePopupMenu(trail.slug); // this will compare the current active to the new and close if needed
      this.setState({ activeTrail: trail });
      activeTrail.toggleMenu(coordinate); // this closes the current popup
    }
    // else there is none set, so start from beginning
    else {
      this.setState({ activeTrail: trail });
      activeTrail.toggleMenu(coordinate); // this closes the current popup
    }
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
              <RegionTrail
                onTrailToggle={this.onTrailToggle}
                trail={trail}
                key={trail.slug}
                metricType={metricType}
              />
            ))}
          </>
        )}
        {regions.map(region => (
          <Region
            region={region}
            key={region.regionName}
            zoom={this.zoom}
            zoomLevel={map.zoom}
            onRegionToggle={this.onRegionToggle}
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
  trails: state.trails,
  metricType: state.map.metricType,
  firstTimeUser: state.map.firstTimeUser
});
const mapDispatchToProps = dispatch => ({
  goToSystem: (zoom, center) => {
    dispatch(goToSystem(zoom, center));
  },
  highlightRegion: name => {
    dispatch(highlightRegion(name));
  }
});

Map.propTypes = {
  regions: regionsShape.isRequired,
  map: mapShape.isRequired,
  highlightRegion: PropTypes.func.isRequired,
  goToSystem: PropTypes.func.isRequired,
  goTo: PropTypes.func,
  trails: trailsShape.isRequired,
  firstTimeUser: PropTypes.bool.isRequired,
  metricType: PropTypes.string.isRequired
};

Map.defaultProps = {
  goTo: () => {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
