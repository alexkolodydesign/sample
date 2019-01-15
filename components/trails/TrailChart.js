import React from 'react';
import { GoogleMap, Marker } from 'react-google-maps';
import { connect } from 'react-redux';
import Paths from './Paths';
import ElevationChart from './ElevationChart';
import { enhanceTrail, setCenterAndZoom } from '../../utils/enhanceTrail';
import { trailShape } from '../../utils/propTypes';

class TrailChart extends React.Component {
  state = {
    center: { lat: 37.2, lng: -113.432 },
    mapStyle: 'roadmap',
    loading: true,
    coordinates: [],
    connector_coordinates: []
  };

  mapLoaded = React.createRef();

  componentDidUpdate = prevProps => {
    const { trail } = this.props;
    if (trail.slug !== prevProps.trail.slug) {
      this.updateCoordinates(this.props, this.state);
    }
  };

  componentDidMount = () => {
    const { trail } = this.props;
    this.setState({
      zoom: Number(trail.custom_data.defaultZoom),
      trailhead:
        trail.custom_data.trailhead_latitude && trail.custom_data.trailhead_longitude
          ? {
              lat: Number(trail.custom_data.trailhead_latitude),
              lng: Number(trail.custom_data.trailhead_longitude)
            }
          : false
    });
    this.updateCoordinates(this.props, this.state);
  };

  updateCoordinates = async (props, state) => {
    const newState = { ...state };
    newState.mapStyle = props.mapStyle;
    // Get trail from redux store and add coordinate info if it doesn't exist
    const matchingTrail = props.trails.find(
      reduxTrail => props.trail.slug === reduxTrail.slug
    );
    const enhancedTrail = await enhanceTrail(
      matchingTrail,
      props.updateConnectorTrailCoords,
      props.updateTrailCoords
    );
    newState.coordinates = enhancedTrail.coordinates;
    newState.connector_coordinates = enhancedTrail.connector_coordinates;
    // Update trailhead when new props come in
    newState.trailhead =
      props.trail.custom_data.trailhead_latitude &&
      props.trail.custom_data.trailhead_longitude
        ? {
            lat: Number(props.trail.custom_data.trailhead_latitude),
            lng: Number(props.trail.custom_data.trailhead_longitude)
          }
        : false;
    // Update new bounding box
    const bounds = setCenterAndZoom(
      newState.coordinates,
      newState.connector_coordinates,
      newState.trailhead
    );
    newState.zoom = bounds.zoom;
    newState.center = bounds.center;
    newState.loading = false;
    this.setState(newState);
  };

  pathMarker = location => {
    this.setState({ marker: location });
  };

  render() {
    const { trail } = this.props;
    const {
      coordinates,
      connector_coordinates,
      loading,
      zoom,
      center,
      mapStyle,
      marker
    } = this.state;
    if (loading) return null;
    const { google } = window;
    // Change Trail Color Based on the First Value of Recommended Use Array
    let trailColor;
    if (trail.custom_data.recommendedUse[0]) {
      switch (trail.custom_data.recommendedUse[0].value) {
        case 'hiking':
          trailColor = '#ed264c';
          break;
        case 'biking':
          trailColor = '#ff9100';
          break;
        case 'equestrian':
          trailColor = '#662f8e';
          break;
        case 'ohv':
          trailColor = '#00a89c';
          break;
        default:
          trailColor = '#ff0000';
      }
    } else {
      trailColor = '#ff0000';
    }
    return (
      <>
        {coordinates ? (
          <>
            <GoogleMap
              ref={this.mapLoaded}
              zoom={zoom}
              center={center}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ&v=3.exp&libraries=geometry,drawing,places"
              options={{ styles: mapStyle }}
              defaultOptions={{ streetViewControl: false }}
            >
              <Paths
                coordinates={coordinates}
                toggleMenu={this.toggleMenu}
                trailColor={trailColor}
                slug={trail.slug}
              />
              <Paths
                coordinates={connector_coordinates}
                trailColor="#000000"
                slug={trail.slug}
              />
              {marker && <Marker position={marker} />}
              {trail.custom_data.trailhead_latitude &&
                trail.custom_data.trailhead_longitude && (
                  <Marker
                    position={{
                      lat: Number(trail.custom_data.trailhead_latitude),
                      lng: Number(trail.custom_data.trailhead_longitude)
                    }}
                    icon={{
                      url: '/static/images/trailhead-icon.png',
                      scaledSize: new google.maps.Size(20, 25)
                    }}
                  />
                )}
              {trail.custom_data.poi &&
                trail.custom_data.poi.map(poi => {
                  const poi_icon = poi.icon
                    ? poi.icon
                    : '/static/images/trailhead-icon.png';
                  return (
                    <Marker
                      key={`uniquekey${poi.latitude}${poi.longitude}`}
                      position={{ lat: Number(poi.latitude), lng: Number(poi.longitude) }}
                      icon={{
                        url: poi_icon,
                        scaledSize: new google.maps.Size(20, 25)
                      }}
                    />
                  );
                })}
            </GoogleMap>
            <h1>ID: {trail.id}</h1>
            {trail.custom_data.recommendedUse[0] &&
              trail.custom_data.recommendedUse[0].value !== 'ohv' && (
                <ElevationChart
                  coordinates={coordinates.slice(0).reverse()}
                  trail={trail}
                  areaStrokeColor={trailColor}
                  pathMarker={this.pathMarker}
                />
              )}
          </>
        ) : (
          <p>Coordinates Missing {console.log(this.props)}</p>
        )}
      </>
    );
  }
}

TrailChart.propTypes = {
  trail: trailShape.isRequired
};

// Redux
const mapStateToProps = state => ({ trails: state.trails });
const mapDispatchToProps = dispatch => ({
  updateTrailCoords: (coords, slug) => {
    const data = { coords, slug };
    return dispatch({ type: 'UPDATE_TRAIL_COORDINATES', data });
  },
  updateConnectorTrailCoords: (coords, slug) => {
    const data = { coords, slug };
    return dispatch({ type: 'UPDATE_CONNECTOR_TRAIL_COORDINATES', data });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrailChart);
