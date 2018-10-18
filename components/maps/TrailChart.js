import axios from 'axios'
import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker } from "react-google-maps"
import { fitBounds } from 'google-map-react/utils'
import LatLng from 'google-map-react/lib/utils/lib_geo/lat_lng.js'
import LatLngBounds from 'google-map-react/lib/utils/lib_geo/lat_lng_bounds.js'
import { connect } from 'react-redux'
import { updateTrailCoords, updateConnectorTrailCoords } from '../../redux/actions'
import Paths from './Paths'
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
    },
    updateConnectorTrailCoords: (coords, slug) => {
      dispatch(updateConnectorTrailCoords(coords, slug));
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
      connector_coordinates: [],
      trailhead: (this.props.trail.custom_data.trailhead_latitude && this.props.trail.custom_data.trailhead_longitude ? {"lat":Number(this.props.trail.custom_data.trailhead_latitude), "lng":Number(this.props.trail.custom_data.trailhead_longitude)} : false ),
      loading: true
    }
    this.setCenterAndZoom = this.setCenterAndZoom.bind(this)
    this.pathMarker = this.pathMarker.bind(this)
    this.mapLoaded = React.createRef()
    this.setCoordinates = this.setCoordinates.bind(this)
    this.setConnectorTrailCoordinates = this.setConnectorTrailCoordinates.bind(this)
  }
  static getDerivedStateFromProps(props, state) {
    return state.mapStyle = props.mapStyle
  }
  componentDidMount() {
    this._isMounted = true;
    this.setCoordinates()
    this.setConnectorTrailCoordinates()
  }
  componentWillUnmount(){
    this._isMounted = false;
  }

  async setConnectorTrailCoordinates() {
    // If redux store already has coordinates on trail then set component state and set loading to false
    let connector_coordinates
    const matchingTrail = this.props.trails.find(reduxTrail => {
      if (this.props.trail.slug == reduxTrail.slug) return true
    })
    if (matchingTrail && matchingTrail.connector_coordinates) {
      if (this._isMounted) this.setState({loading: false, connector_coordinates: matchingTrail.connector_coordinates})
      return
    }
    // If trail does not have json coordinates exit here
    if (
      !this.props.trail.custom_data.connectorTrailJSON.url ||
      this.props.trail.custom_data.connectorTrailJSON.url === undefined ||
      this.props.trail.custom_data.connectorTrailJSON.url === 'undefined'
    ) {
      this.props.updateConnectorTrailCoords([], this.props.trail.slug)
      return
    }
    // If trail connector_coordinates are not found in redux store try and get them
    try {
      const {data: { trail: { coordinates: coords } } } = await axios.get(`/api/coordinates?url=${this.props.trail.custom_data.connectorTrailJSON.url}`)
      this.props.updateConnectorTrailCoords(coords, this.props.trail.slug)
      if (this._isMounted) this.setState({loading: false, connector_coordinates: coords})
    } catch(e) {
      console.log(e)
    }
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
    if (this.props !== nextProps) return true
    if (this.state === nextState) return false
    else return true
  }
  setCenterAndZoom(coords, connector_coordinates, trailhead) {
    // Make new bounds
    let newBounds = new LatLngBounds()
    // Add LatLng points to the new bounding area
    coords.forEach(bound => {
      if (Array.isArray(bound)) {
        bound.forEach(point => {
          newBounds.extend(new LatLng(point.lat, point.lng))
        })
      } else if (bound !== null) {
        newBounds.extend(new LatLng(bound.lat, bound.lng))
      }
    })

    // add trailhead point if available
    if (trailhead) {
      newBounds.extend(new LatLng(trailhead.lat, trailhead.lng))
    }


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
    const connector_coordinates = this.state.connector_coordinates
    // Change Trail Color Based on the First Value of Recommended Use Array
    let trailColor
    if (trail.custom_data.recommendedUse[0]) {
      switch(trail.custom_data.recommendedUse[0].value) {
        case 'hiking':
          trailColor = '#ed264c'
          break
        case 'biking':
          trailColor = '#ff9100'
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
    } else { trailColor = '#ff0000' }
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
              onTilesLoaded={() => !this.state.mapIsCentered ? this.setCenterAndZoom(coordinates, connector_coordinates, this.state.trailhead) : null}
              options={{
                styles: this.state.mapStyle
              }}
              defaultOptions={{
                streetViewControl: false
              }}
            >
              <Paths coordinates={coordinates} toggleMenu={this.toggleMenu} trailColor={trailColor}  />
              <Paths coordinates={connector_coordinates} trailColor={"#000000"}  />
              {this.state.marker &&
                <Marker
                  position={this.state.marker}
                />
              }
              {
                trail.custom_data.trailhead_latitude && trail.custom_data.trailhead_longitude &&
                  <Marker
                    position={{ lat: Number(this.props.trail.custom_data.trailhead_latitude), lng: Number(this.props.trail.custom_data.trailhead_longitude) }}
                    icon={{
                      url: "/static/images/trailhead-icon.png",
                      scaledSize: new google.maps.Size(20 ,25)
                    }}
                  />
              }
            </GoogleMap>
            {(trail.custom_data.recommendedUse[0] && trail.custom_data.recommendedUse[0].value != "ohv") &&
              <ElevationChart coordinates={coordinates.slice(0).reverse()} trail={this.props.trail} areaStrokeColor={trailColor} pathMarker={this.pathMarker} />
            }
          </React.Fragment>
          :
          <p>Coordinates Missing {console.log(this.props)}</p>
        }
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TrailChart)
