import { withScriptjs, withGoogleMap, GoogleMap, Polyline } from "react-google-maps"
import ElevationChart from './ElevationChart'

const TrailMap = props =>
  <div>
    <div className="map_container">
      <MapContainer
        loadingElement={<div style={{ height: `40rem` }} />}
        containerElement={<div style={{ height: `100%` }} id="washington_map" />}
        mapElement={<div style={{ height: `40rem` }} />}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ&v=3.exp&libraries=geometry,drawing,places"
        trail={props.trail}
      />
    </div>
    <div className="buttons">
      <button>Download Printable Map</button>
      <button>Download GPS for Offline</button>
      <button>Share this Trail</button>
      <button>Save this Trail</button>
    </div>
    <style jsx>{`
      .map_container {background: #fff; padding:3rem;}
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

const MapContainer = withScriptjs(withGoogleMap( (props) => <Map trail={props.trail} /> ))
class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = { zoom: 18, center: {lat: 37.2, lng: -113.432} }
    this.setCoordinates = this.setCoordinates.bind(this)
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
          zoom={this.state.zoom}
          center={{lat: coordinates[center].lat, lng: coordinates[center].lng}}
        >
          <Polyline
            path={coordinates}
            options={{
              strokeColor: trailColor,
              strokeOpacity:1,
              strokeWeight:3,
            }}
          />
        </GoogleMap>
        <ElevationChart coordinates={coordinates} />
      </React.Fragment>
    )
  }
}



export default TrailMap
