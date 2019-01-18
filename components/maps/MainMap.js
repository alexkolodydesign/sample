import React from 'react';
import { GoogleMap } from 'react-google-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import filterActions from '../../utils/filterActions';
import Region from '../regions/Region';
import RegionTrail from '../regions/RegionTrail';
import UserLocation from '../gps/UserLocation';
import RegionsData from '../services/RegionsData';
import { filtersShape } from '../../utils/propTypes';
import { TrailsContext } from '../../pages/_app';

class Map extends React.Component {
  static washington_map = React.createRef();

  componentDidMount = () => {
    const { goTo, center } = this.props;
    if (window.innerWidth >= 768 && window.innerWidth < 991) goTo(9, center);
    else if (window.innerWidth >= 992 && window.innerWidth < 1500) goTo(10, center);
    else if (window.innerWidth > 1500) goTo(11, center);
    else goTo(8, center);
  };

  zoom = (zoom, center, regionName) => {
    const { highlight, goTo } = this.props;
    highlight(regionName);
    goTo(zoom, center);
  };

  render() {
    const { mapStyle, zoom, center, gps, filters, firstTimeUser } = this.props;
    const zoomState = this.zoom;
    const zoomLevel = zoom;
    const { google } = window;
    return (
      <GoogleMap
        zoom={zoom}
        center={center}
        // eslint-disable-next-line react/jsx-no-bind
        onZoomChanged={function zoomChange() {
          zoomState(this.getZoom(), null);
        }}
        options={{
          mapTypeId: mapStyle,
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
        {gps && <UserLocation />}
        {firstTimeUser === false && (
          <TrailsContext.Consumer>
            {({ loading, trails }) => {
              if (loading) return null;
              const filteredTrails = filterActions(trails, filters, zoomLevel);
              return filteredTrails.map(trail => (
                <RegionTrail trail={trail} key={trail.slug} />
              ));
            }}
          </TrailsContext.Consumer>
        )}
        <RegionsData>
          {regions =>
            regions.map(region => (
              <Region
                region={region}
                key={region.regionName}
                zoom={this.zoom}
                zoomLevel={zoom}
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
  mapStyle: state.map.mapStyle,
  zoom: state.map.zoom,
  center: state.map.center,
  gps: state.map.gps,
  filters: state.map.filters,
  firstTimeUser: state.map.firstTimeUser
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
  mapStyle: PropTypes.string.isRequired,
  zoom: PropTypes.number.isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }),
  gps: PropTypes.bool.isRequired,
  filters: filtersShape.isRequired,
  highlight: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  firstTimeUser: PropTypes.bool.isRequired
};

Map.defaultProps = {
  center: { lat: 37.327059, lng: -113.445826 }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
