import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker } from "react-google-maps"
import ElevationChart from './ElevationChart'
import { fitBounds } from 'google-map-react/utils';
import LatLng from 'google-map-react/lib/utils/lib_geo/lat_lng.js';
import LatLngBounds from 'google-map-react/lib/utils/lib_geo/lat_lng_bounds.js';
import ShareButtons from '../layout/ShareButtons'
// REVIEW: Moved Your Print Styles to Separate Folder
import printStyle from './mapstyles/print'

export default class TrailMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {mapStyle: false, shareButtons: false}
    this.toggleMapStyle = this.toggleMapStyle.bind(this)
    this.toggleShareButtons = this.toggleShareButtons.bind(this)
  }
  toggleShareButtons() {
    this.setState({shareButtons: !this.state.shareButtons})
  }
  toggleMapStyle() {
    if (!this.state.mapStyle) {
      // REVIEW: Moved Your Print Styles to Separate Folder
      this.setState({mapStyle: printStyle })
    } else {
      this.setState({mapStyle: false})
    }
  }
  render() {
    return (
      <div>
        <div className="map_container">
          <MapContainer
            loadingElement={<div style={{ height: `40rem` }} />}
            containerElement={<div style={{ height: `100%` }} id="washington_map" />}
            mapElement={<div style={{ height: `40rem` }} />}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ&v=3.exp&libraries=geometry,drawing,places"
            trail={this.props.trail}
            // REVIEW: You forgot to pass this state down from this component
            mapStyle={this.state.mapStyle}
          />
        </div>
        <div className="buttons">
          <button onClick={this.toggleMapStyle}>Download Printable Map</button>
          <button>Download GPS for Offline</button>
          {/* TODO: Give this class some styles for when it's active or not */}
          <button onClick={this.toggleShareButtons} className={this.state.shareButtons && "active"}>Share this Trail</button>
          <button>Save this Trail</button>
        </div>
        <div className="share_buttons">
          {this.state.shareButtons && <ShareButtons />}
        </div>
        <style jsx>{`
          .map_container {background: #fff;
              background-image: linear-gradient(rgba(255,255,255,0.95),rgba(255,255,255,0.95)),url(/static/images/background-pattern.svg);
              background-position: center;
              background-size: 29rem auto;
              padding:3rem;
          }
          .map {
            background: #eee;
            width: 100%;
            height: 50rem;
          }
          .buttons {
            margin-top: 3rem;
            display: grid;
            grid-template: 1fr 1fr / 1fr 1fr;
            grid-gap: 3rem 6rem;
          }
          .share_buttons {
            margin-top: 3rem;
          }
          button {
            border: none;
            border-radius: 1rem;
            background: #3fa9f5;
            padding: 1.5rem 3rem;
            color: #fff;
            font-size: 1.8rem;
            cursor: pointer;
            transition: all 500ms;
            &:hover {
              background: #0d93f2;
            }
          }
        `}</style>
      </div>
    )
  }
}

// REVIEW: You forgot to pass the mapStyle prop down from this component
const MapContainer = withScriptjs(withGoogleMap( (props) => <Map trail={props.trail} mapStyle={props.mapStyle} /> ))
class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = { zoom: Number(this.props.trail.custom_data.defaultZoom), center: {lat: 37.2, lng: -113.432}, mapStyle: false }
    this.setCoordinates = this.setCoordinates.bind(this)
    this.setCenterAndZoom = this.setCenterAndZoom.bind(this)
    this.pathMarker = this.pathMarker.bind(this)
    this.mapLoaded = React.createRef()
  }
  // REVIEW: When the props change after clicking download printable map, we need to catch this change here and return a new state
  static getDerivedStateFromProps(props, state) {
    return state.mapStyle = props.mapStyle
  }
  async setCoordinates() {
    if (!this.props.trail.custom_data.jsonCoordinates) return null
    try {
      const {data: { trail }} = await axios.get('/api/coordinates', {params: {url: encodeURI(this.props.trail.custom_data.jsonCoordinates)} } )
      // Store this data so we don't make extra calls when zooming
      const trailStorage = localStorage.getItem('trails')
      if (!trailStorage) {
        localStorage.setItem('trails', JSON.stringify([{
          slug: this.props.trail.slug,
          coordinates: trail.coordinates
        }]))
      } else {
        const trailStorageJSON = JSON.parse(trailStorage)
        trailStorageJSON.push({
          slug: this.props.trail.slug,
          coordinates: trail.coordinates
        })
        localStorage.removeItem('trails')
        localStorage.setItem('trails', JSON.stringify(trailStorageJSON))
      }
      this.setState({coordinates: trail.coordinates})
    } catch(e) {
      console.log("Issue with Url: ", e)
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
    coords.forEach(bound => newBounds.extend(new LatLng(bound.lat, bound.lng)))
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
    let coordinates
    // Check localstorage for data before sending fetch
    const trailStorage = localStorage.getItem('trails')
    // No localstorage so send fetch
    if (!trailStorage) {
      if (this.state.coordinates === undefined || this.state.coordinates.length == 0) {
        this.setCoordinates()
        return null
      }
    } else {
      // Check if localstorage has this trail in it
      const trailStorageJSON = JSON.parse(trailStorage)
      const match = trailStorageJSON.find(storedTrail => trail.slug === storedTrail.slug)
      if (match) coordinates = match.coordinates.map(point => ({lat: Number(point.lat), lng: Number(point.lng)}))
      else {
        this.setCoordinates()
        return null
      }
    }
    if (!coordinates) coordinates = this.state.coordinates.map(point => ({lat: Number(point.lat), lng: Number(point.lng)}))
    // Change Trail Color Based on the First Value of Recommended Use Array
    let trailColor
    switch(trail.custom_data.recommendedUse[0].value) {
      case 'hiking':
        trailColor = '#ed264c'
        break
      case 'biking':
        trailColor = '#ff5a00'
        break
      case 'horseback':
        trailColor = '#662f8e'
        break
      case 'atv':
        trailColor = '#00a89c'
        break
      default:
        trailColor = '#ff0000'
    }
    const center = Math.round(coordinates.length / 2)
    return (
      <React.Fragment>
        <GoogleMap
          ref={this.mapLoaded}
          zoom={this.state.zoom}
          center={{lat: coordinates[center].lat, lng: coordinates[center].lng}}
          // Only do this once. (TODO: look for a better event for this function like map loaded or something)
          onTilesLoaded={() => !this.state.mapIsCentered ? this.setCenterAndZoom(coordinates) : null}
          // REVIEW: You were using defaultOptions which probably worked the same as this, but the main difference here is that I'm now using state which is being updated by getDerivedStateFromProps based on what props are being passed down to this component
          options={{
            styles: this.state.mapStyle
          }}
        >
          <Polyline
            path={coordinates}
            options={{
              strokeColor: trailColor,
              strokeOpacity:1,
              strokeWeight:3,
            }}
          />
          {this.state.marker &&
            <Marker
              position={this.state.marker}
            />
          }
        </GoogleMap>
        <ElevationChart coordinates={coordinates.slice(0).reverse()} trail={this.props.trail} pathMarker={this.pathMarker} />
      </React.Fragment>
    )
  }
}



