import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polygon, InfoWindow, Polyline, KmlLayer  } from "react-google-maps"

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
        zoom={this.state.zoom}
        center={this.state.center}
        onZoomChanged={function(e) {
          zoomState(this.getZoom(), null)
        }}
      >
        <KmlLayer
          url="http://192.241.222.22/washington-trails/regions.kml"
          options={{ preserveViewport: true }}
        />
        {this.props.regionData.regions.map((region, k) => <Region region={region} key={k} zoom={this.zoom} zoomLevel={this.state.zoom} /> )}
        {this.props.regionData.trails.map((trail, k) => <Trail trail={trail} key={k} zoomLevel={this.state.zoom} />)}
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
          onMouseOver={function() { this.setOptions({fillOpacity: 0.5}) }}
          onMouseOut={function() { this.setOptions({fillOpacity: 0.35}) }}
          onClick={() => this.props.zoom( 13, {lat: region.markerCoordinates.lat, lng: region.markerCoordinates.lng} )}
        />
        {this.props.zoomLevel < 13 &&
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
        }
      </React.Fragment>
    )
  }
}

class Trail extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const trail = this.props.trail
    if (!trail.coordinates) return null
    return (
      <React.Fragment>
        <Polyline
          path={trail.coordinates.map( trail => ({lat: trail[0], lng: trail[1]}) )}
          strokeColor="#ff0000"
          strokeWeight={10}
          strokeOpacity={1.0}
        />
      </React.Fragment>
    )
  }
}
