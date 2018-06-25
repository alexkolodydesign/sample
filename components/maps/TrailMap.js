import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import ElevationChart from './ElevationChart'

const TrailMap = props =>
  <div>
    <div className="map_container">
      <MapContainer
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        trailData={props.trailData}
      />
      <ElevationChart />
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

const MapContainer = withScriptjs(withGoogleMap( (props) => <Map regionData={props.regionData} /> ))
class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = { zoom: 10, center: {lat: 37.2, lng: -113.432} }
    this.zoom = this.zoom.bind(this)
  }
  zoom(zoom, center) {
    this.setState({zoom, center})
  }
  render() {
    const zoomState = this.zoom
    return (
      <GoogleMap
        zoom={this.state.zoom}
        center={this.state.center}
        onZoomChanged={function(e) {
          zoomState(this.getZoom(), null)
        }}
      >

      </GoogleMap>
    )
  }
}



export default TrailMap
