import axios from 'axios'
import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker } from "react-google-maps"
import { fitBounds } from 'google-map-react/utils'
import LatLng from 'google-map-react/lib/utils/lib_geo/lat_lng.js'
import LatLngBounds from 'google-map-react/lib/utils/lib_geo/lat_lng_bounds.js'
import { connect } from 'react-redux'

import { updateTrailCoords } from '../../redux/actions'
import ElevationChart from './ElevationChart'
import Paths from './Paths'
import ShareButtons from '../layout/ShareButtons'
import printStyle from './mapstyles/print'

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

const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

class TrailMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = { coordinates: [], loading: true, mapStyle: false, shareButtons: false }
    this.toggleMapStyle = this.toggleMapStyle.bind(this)
    this.toggleShareButtons = this.toggleShareButtons.bind(this)
    this.printMap = this.printMap.bind(this)
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
      console.log(e)
    }
  }
  toggleShareButtons() {
    this.setState({shareButtons: !this.state.shareButtons})
  }
  toggleMapStyle() {
    if (!this.state.mapStyle) this.setState({mapStyle: printStyle })
    else this.setState({mapStyle: false })
  }
  printMap() {
    window.print()
    return true
  }
  render() {
    const trail = this.props.trail
    // Find matching trail
    const matchingTrail = this.props.map.trails.find(reduxTrail => {
      if (trail.slug == reduxTrail.slug) return true
    })
    if (matchingTrail.coordinates) trail.coordinates = matchingTrail.coordinates.trail.coordinates
    else {
      trail.coordinates = this.setCoordinates()
    }
    if (this.state.loading) return null
    return (
      <div className="trail_map">
        <div className="map_container">
          <MapContainer
            loadingElement={<div style={{ height: `40rem` }} />}
            containerElement={<div style={{ height: `100%` }} id="washington_map" />}
            mapElement={<div style={{ height: `40rem` }} />}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ&v=3.exp&libraries=geometry,drawing,places"
            trail={this.props.trail}
            mapStyle={this.state.mapStyle}
          />
        </div>
        <div className="buttons">
          <button onClick={this.toggleShareButtons} className={this.state.shareButtons && "active"}>
            <img src="/static/images/trail/share.svg" alt="Event List"/>
            <span>Share Trail</span>
          </button>
          <button>
            <img src="/static/images/trail/download.svg" alt="Event List"/>
            <span>Download GPS</span>
          </button>
          <button onClick={
            async () => {
              this.toggleMapStyle()
              await timeout(250)
              this.printMap()
              await timeout(250)
              this.toggleMapStyle()
            }
          }>
            <img src="/static/images/trail/print.svg" alt="Print Map"/> Print Map</button>
          <button>
            <img src="/static/images/menu/gps.svg" alt="Directions"/>
            <span>Directions to Trail Head</span>
          </button>
        </div>
        <div className="share_buttons">
          {this.state.shareButtons && <ShareButtons />}
        </div>
        <style jsx>{`
          @media screen {
            .trail_map {
              grid-column-start: 1;
              grid-column-end: 2;
              grid-row-start: 1;
              grid-row-end: 2;
            }
            .map_container {
              background: #fff;
              background-image: linear-gradient(rgba(255,255,255,0.98),rgba(255,255,255,0.98)),url(/static/images/background-pattern.svg);
              background-position: center;
              background-size: 29rem auto;
              padding: 3rem;
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
              grid-gap: 1.5rem
            }
            .share_buttons {
              margin-top: 1.5rem;
            }
            button {
              border: none;
              border-radius: 1rem;
              background: #3fa9f5;
              padding: 1rem 2rem;
              color: #fff;
              font-size: 1.8rem;
              cursor: pointer;
              transition: all 500ms;
              display: flex;
              align-items: center;
              justify-content: center;
              &:hover {
                background: #0d93f2;
              }
              &:last-of-type {
                background: #262727;

                grid-column-start: 1;
                grid-column-end: 2;
                grid-row-start: 1;
                grid-row-end: 2;

                &:hover {
                  background: #666666;
                }

              }
              &.active {
                background-color: #00a89c;
              }
              img {
                width: 3rem;
                height: 3rem;
                margin-right: 1rem
              }
            }
          }
          @media screen and (min-width: 768px) {
            .buttons {
              margin-top: 1.5rem;
              grid-template: 1fr 1fr / 1fr 1fr 1fr;
              button {
                &:last-of-type {

                  // grid-column-start: 1;
                  // grid-column-end: 4;
                  // grid-row-start: 2;
                  // grid-row-end: 3;

                  grid-column: 1 / span 3;
                  grid-row: 2;
                }
              }
            }
            .trail_map {
              grid-column-start: 2;
              grid-column-end: 3;
            }
          }
          @media print {
            .map_container, .gm-style, .gm-style * {
              max-width: 100%;
            }
            .buttons {
              display: none;
            }
          }
        `}</style>
      </div>
    )
  }
}

const MapContainer = withScriptjs(withGoogleMap( (props) => <Map trail={props.trail} mapStyle={props.mapStyle} /> ))
class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = { zoom: Number(this.props.trail.custom_data.defaultZoom), center: {lat: 37.2, lng: -113.432}, mapStyle: false, coordinates: this.props.trail.coordinates }
    this.setCenterAndZoom = this.setCenterAndZoom.bind(this)
    this.pathMarker = this.pathMarker.bind(this)
    this.mapLoaded = React.createRef()
  }
  static getDerivedStateFromProps(props, state) {
    return state.mapStyle = props.mapStyle
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
          // Only do this once. (TODO: look for a better event for this function like map loaded or something)
          onTilesLoaded={() => !this.state.mapIsCentered ? this.setCenterAndZoom(coordinates) : null}
          options={{
            styles: this.state.mapStyle
          }}
          defaultOptions={{
            streetViewControl: false
          }}
        >

          <Paths coordinates={coordinates} toggleMenu={this.toggleMenu} trailColor={trailColor}  />

          {this.state.marker &&
            <Marker
              position={this.state.marker}
            />
          }
        </GoogleMap>
        <ElevationChart coordinates={coordinates.slice(0).reverse()} trail={this.props.trail} areaStrokeColor={trailColor} pathMarker={this.pathMarker} />
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailMap)


