import axios from "axios"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import Region from './Region'
import RegionTrail from './RegionTrail'

export default class MainMap extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="map">
        <MapContainer
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} id="washington_map" />}
          mapElement={<div style={{ height: `100%` }} />}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ&v=3.exp&libraries=geometry,drawing,places"
          regionData={this.props.regionData}
        />
        <style jsx>{`
          .map {
            background: #eee;
            position: fixed;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: calc(100% - 11.5rem);
            z-index: 1;
          }
          @media screen and (min-width: 768px) {
            .map {
              height: calc(100% - 9.75rem);
            }
          }
          @media screen and (min-width: 992px) {
            .map {
              height: calc(100% - 10.75rem);
            }
          }
        `}</style>
      </div>
    )
  }
}

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
        defaultOptions={{
          streetViewControl: false,
          mapTypeControl: false
        }}
      >
        {this.props.regionData.regions.map((region, k) => <Region region={region} key={k} zoom={this.zoom} zoomLevel={this.state.zoom} /> )}
        {this.props.regionData.trails.map((trail, k) => <RegionTrail trail={trail} key={k} zoomLevel={this.state.zoom} />)}
      </GoogleMap>
    )
  }
}
