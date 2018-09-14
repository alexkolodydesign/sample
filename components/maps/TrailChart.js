import axios from 'axios'
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
    trails: state.trails,
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
    this.state = {
      zoom: Number(this.props.trail.custom_data.defaultZoom),
      center: {lat: 37.2, lng: -113.432},
      mapStyle: 'roadmap',
      coordinates: [],
      loading: true
    }
    this.setCenterAndZoom = this.setCenterAndZoom.bind(this)
    this.pathMarker = this.pathMarker.bind(this)
    this.mapLoaded = React.createRef()
    this.setCoordinates = this.setCoordinates.bind(this)
  }
  static getDerivedStateFromProps(props, state) {
    return state.mapStyle = props.mapStyle
  }
  componentDidMount() {
    this._isMounted = true;
    this.setCoordinates()
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
  async setCoordinates() {
    // If redux store already has coordinates on trail then set component state and set loading to false
    let coordinates
    const matchingTrail = this.props.trails.find(reduxTrail => {
      if (this.props.trail.slug == reduxTrail.slug) return true
    })
    if (matchingTrail && matchingTrail.coordinates) {
      if (this._isMounted) this.setState({loading: false, coordinates: matchingTrail.coordinates})
      return
    }
    // If trail does not have json coordinates exit here
    if (
      !this.props.trail.custom_data.jsonCoordinates.url ||
      this.props.trail.custom_data.jsonCoordinates.url === undefined ||
      this.props.trail.custom_data.jsonCoordinates.url === 'undefined'
    ) {
      this.props.updateTrailCoords([], this.props.trail.slug)
      return
    }
    // If trail coordinates are not found in redux store try and get them
    try {
      const {data: { trail: { coordinates: coords } } } = await axios.get(`/api/coordinates?url=${this.props.trail.custom_data.jsonCoordinates.url}`)
      this.props.updateTrailCoords(coords, this.props.trail.slug)
      if (this._isMounted) this.setState({loading: false, coordinates: coords})
    } catch(e) {
      console.log(e)
    }
  }
  pathMarker(location) {
    this.setState({marker: location})
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state === nextState) return false
    else return true
  }
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
    // While component is loading
    if (this.state.loading) return null
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
        {coordinates ?
          <React.Fragment>
            <GoogleMap
              ref={this.mapLoaded}
              zoom={this.state.zoom}
              center={this.state.center}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ&v=3.exp&libraries=geometry,drawing,places"
              // Only do this once. (TODO: look for a better event for this function like map loaded or something)
              onTilesLoaded={() => !this.state.mapIsCentered ? this.setCenterAndZoom(coordinates) : null}
              options={{
                styles: this.state.mapStyle
              }}
              defaultOptions={{
                streetViewControl: false
              }}
            >
              <TrailPaths coordinates={coordinates} toggleMenu={this.toggleMenu} trailColor={trailColor}  />
              {this.state.marker &&
                <Marker
                  position={this.state.marker}
                />
              }
            </GoogleMap>
            <ElevationChart coordinates={coordinates.slice(0).reverse()} trail={this.props.trail} areaStrokeColor={trailColor} pathMarker={this.pathMarker} />
          </React.Fragment>
          :
          <p>Coordinates Missing {console.log(this.props)}</p>
        }
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TrailChart)
