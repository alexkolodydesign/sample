import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker } from "react-google-maps"
import { fitBounds } from 'google-map-react/utils'
import LatLng from 'google-map-react/lib/utils/lib_geo/lat_lng.js'
import LatLngBounds from 'google-map-react/lib/utils/lib_geo/lat_lng_bounds.js'
import { connect } from 'react-redux'
import { updateTrailCoords } from '../../redux/actions'
import TrailPaths from './TrailPaths'
import ElevationChart from './ElevationChart'

// Redux
const mapStateToProps = (state, ownProps) => {
  return {
    map: state.map,
    ...ownProps
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateTrailCoords: (coords, slug) => {
      dispatch(updateTrailCoords(coords, slug));
    }
  };
};

class TrailChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { zoom: Number(this.props.trail.custom_data.defaultZoom), center: {lat: 37.2, lng: -113.432}, mapStyle: 'roadmap', coordinates: this.props.trail.coordinates }
    this.setCenterAndZoom = this.setCenterAndZoom.bind(this)
    this.pathMarker = this.pathMarker.bind(this)
    this.mapLoaded = React.createRef()
    this.setCoordinates = this.setCoordinates.bind(this)
  }
  async setCoordinates() {
    if (!this.props.trail.custom_data.jsonCoordinates.url || this.props.trail.custom_data.jsonCoordinates.url === undefined) {
      this.props.updateTrailCoords([], this.props.trail.slug)
    }
    try {
      const coords = await axios.get(`/api/coordinates?url=${this.props.trail.custom_data.jsonCoordinates.url}`)
      this.props.updateTrailCoords(coords.data, this.props.trail.slug)
      this.setState({loading: false, coordinates: coords.data})
    } catch(e) {
      // console.log(e)
    }
  }
  // static getDerivedStateFromProps(props, state) {
  //   return state.mapStyle = props.mapStyle
  // }
  pathMarker(location) {
    this.setState({marker: location})
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state === nextState) return false
  //   else return true
  // }
  setCenterAndZoom(coords) {
    // Make new bounds
    let newBounds = new LatLngBounds()
    // Add LatLng points to the new bounding area
    coords.forEach(bound => {
      if (Array.isArray(bound)) {
        bound.forEach(point => {
          newBounds.extend(new LatLng(point.lat, point.lng))
        })
      } else {
        newBounds.extend(new LatLng(bound.lat, bound.lng))
      }
    })
    // Get the new center and zoom from new bounds
    const fit = fitBounds(
      {nw: newBounds.getNorthWest(), se: newBounds.getSouthEast()},
      {width: 820, height: 400}
    );
    // Update state for map
    this.setState({zoom: fit.zoom, center: fit.center, mapIsCentered: true})
  }
  render() {
    const trail = this.props.trail
    const coordinates = this.state.coordinates
    // Change Trail Color Based on the First Value of Recommended Use Array
    let trailColor
    switch(trail.custom_data.recommendedUse[0].value) {
      case 'hiking':
        trailColor = '#ed264c'
        break
      case 'biking':
        trailColor = '#ff5a00'
        break
      case 'equestrian':
        trailColor = '#662f8e'
        break
      case 'ohv':
        trailColor = '#00a89c'
        break
      default:
        trailColor = '#ff0000'
    }
    return (
      <React.Fragment>
        <GoogleMap
          ref={this.mapLoaded}
          className='THEMAP'
          zoom={this.state.zoom}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ&v=3.exp&libraries=geometry,drawing,places"
          // Only do this once. (TODO: look for a better event for this function like map loaded or something)
          onTilesLoaded={() => !this.state.mapIsCentered ? this.setCenterAndZoom(coordinates) : null}
          options={{ styles: this.state.mapStyle }}
          defaultOptions={{
            streetViewControl: false
          }}
        >


          {this.state.marker &&
            <Marker
              position={this.state.marker}
            />
          }
        </GoogleMap>
      </React.Fragment>
    )
  }
}
// <TrailPaths coordinates={coordinates} toggleMenu={this.toggleMenu} trailColor={trailColor}  />
// <ElevationChart coordinates={coordinates.slice(0).reverse()} trail={this.props.trail} areaStrokeColor={trailColor} pathMarker={this.pathMarker} />
export default connect(mapStateToProps, mapDispatchToProps)(TrailChart)
