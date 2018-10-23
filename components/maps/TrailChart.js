import axios from 'axios'
import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker } from "react-google-maps"
import { connect } from 'react-redux'
import { updateTrailCoords, updateConnectorTrailCoords } from '../../redux/actions'
import Paths from './Paths'
import ElevationChart from './ElevationChart'
import { enhanceTrail, setCenterAndZoom } from '../../redux/enhanceTrail'

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
      loading: true,
      coordinates: [],
      connector_coordinates: [],
      trailhead: (this.props.trail.custom_data.trailhead_latitude && this.props.trail.custom_data.trailhead_longitude ? {"lat":Number(this.props.trail.custom_data.trailhead_latitude), "lng":Number(this.props.trail.custom_data.trailhead_longitude)} : false )
    }
    this.pathMarker = this.pathMarker.bind(this)
    this.updateCoordinates = this.updateCoordinates.bind(this)
    this.mapLoaded = React.createRef()
  }
  componentDidMount() {
    this.updateCoordinates(this.props, this.state);
  }
  async updateCoordinates(props, state) {
    const newState = {...state}
    newState.mapStyle = props.mapStyle
    // Get trail from redux store and add coordinate info if it doesn't exist
    const matchingTrail = props.trails.find(reduxTrail => props.trail.slug == reduxTrail.slug)
    const enhancedTrail = await enhanceTrail(matchingTrail, props.updateConnectorTrailCoords, props.updateTrailCoords)
    newState.coordinates = enhancedTrail.coordinates
    newState.connector_coordinates = enhancedTrail.connector_coordinates
    // Update trailhead when new props come in
    newState.trailhead = (props.trail.custom_data.trailhead_latitude && props.trail.custom_data.trailhead_longitude ? {"lat":Number(props.trail.custom_data.trailhead_latitude), "lng":Number(this.props.trail.custom_data.trailhead_longitude)} : false )
    // Update new bounding box
    const bounds = setCenterAndZoom(newState.coordinates, newState.connector_coordinates, newState.trailhead)
    newState.zoom = bounds.zoom
    newState.center = bounds.center
    newState.loading = false
    this.setState(newState)
  }
  componentDidUpdate(prevProps) {
    if (this.props.trail.slug !== prevProps.trail.slug) this.updateCoordinates(this.props, this.state);
  }
  pathMarker(location) {
    this.setState({marker: location})
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) return true
    if (this.state === nextState) return false
    else return true
  }
  render() {
    if (this.state.loading) return null
    const trail = this.props.trail
    const { coordinates, connector_coordinates } = this.state
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
              options={{ styles: this.state.mapStyle }}
              defaultOptions={{ streetViewControl: false }}
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
                    position={{ lat: Number(trail.custom_data.trailhead_latitude), lng: Number(trail.custom_data.trailhead_longitude) }}
                    icon={{
                      url: "/static/images/trailhead-icon.png",
                      scaledSize: new google.maps.Size(20 ,25)
                    }}
                  />
              }
              {
                trail.custom_data.poi &&
                  trail.custom_data.poi.map((poi, k) => {
                    var poi_icon = poi.icon ? poi.icon : "/static/images/trailhead-icon.png";
                    return <Marker key={k} position={{ "lat":Number(poi.latitude), "lng":Number(poi.longitude) }}
                    icon={{
                      url: poi_icon,
                      scaledSize: new google.maps.Size(20 ,25)
                    }}     />
                  })
              }
            </GoogleMap>
            {(trail.custom_data.recommendedUse[0] && trail.custom_data.recommendedUse[0].value != "ohv") &&
              <ElevationChart coordinates={coordinates.slice(0).reverse()} trail={trail} areaStrokeColor={trailColor} pathMarker={this.pathMarker} />
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
