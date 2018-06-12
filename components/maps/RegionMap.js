import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polygon, InfoWindow  } from "react-google-maps"

export default class RegionMap extends React.Component {
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
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          regionData={this.props.regionData}
        />
        <style jsx>{`
          .map {
            background: #eee;
            border: 0.1rem solid #333;
            position: fixed;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
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
    this.state = { zoom: 11, center: {lat: 37.141, lng: -113.432} }
    this.zoom = this.zoom.bind(this)
  }
  zoom(zoom, center) {
    this.setState({zoom, center})
  }
  render() {
    const zoomState = this.zoom
    return (
      <GoogleMap
        ref={() => this.map = React.createRef()}
        zoom={this.state.zoom}
        center={this.state.center}
        onZoomChanged={ function(e) {
          const zoom = this.getZoom()
          zoomState(zoom, {lat: 37.141, lng: -113.432})
        }}
      >
        {this.props.regionData.regions.map((region, k) => {
          return <Region region={region} key={k} zoom={this.zoom} />
        })}
      </GoogleMap>
    )
  }
}

class Region extends React.Component {
  constructor(props) {
    super(props)
    this.state = { menu: false }
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  toggleMenu() {
    this.setState({menu: !this.state.menu})
  }
  render() {
    const region = this.props.region
    return (
      <React.Fragment>
        <Polygon
          paths={region.coordinates}
          strokeColor="#ff0000"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#ff0000"
          fillOpacity={0.35}
          onMouseOver={function () { this.setOptions({fillOpacity: 0.5}) }}
          onMouseOut={function () { this.setOptions({fillOpacity: 0.35}) }}
          onClick={() => this.props.zoom( 13, {lat: region.markerCoordinates.lat, lng: region.markerCoordinates.lng} )}
        />
        <Marker
          position={{lat: region.markerCoordinates.lat, lng: region.markerCoordinates.lng}}
          icon={region.markerIcon}
          onClick={this.toggleMenu}
        >
          {this.state.menu &&
            <InfoWindow onCloseClick={this.props.toggleMenu}>
              <div>
                <h3>{region.regionName}</h3>
              </div>
            </InfoWindow>
          }
        </Marker>
      </React.Fragment>
    )
  }
}
