import axios from 'axios'
import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker } from "react-google-maps"
import { fitBounds } from 'google-map-react/utils'
import LatLng from 'google-map-react/lib/utils/lib_geo/lat_lng.js'
import LatLngBounds from 'google-map-react/lib/utils/lib_geo/lat_lng_bounds.js'

import TrailChart from './TrailChart'
import ShareButtons from '../layout/ShareButtons'
import printStyle from './mapstyles/print'



const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export default class TrailMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = { coordinates: [], loading: true, mapStyle: 'roadmap', shareButtons: false }
    this.toggleMapStyle = this.toggleMapStyle.bind(this)
    this.toggleShareButtons = this.toggleShareButtons.bind(this)
    this.printMap = this.printMap.bind(this)
  }
  toggleShareButtons() {
    this.setState({shareButtons: !this.state.shareButtons})
  }
  toggleMapStyle() {
    if (!this.state.mapStyle) this.setState({mapStyle: printStyle })
    else this.setState({mapStyle: 'roadmap' })
  }
  printMap() {
    window.print()
    return true
  }
  render() {
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

const MapContainer = withScriptjs(withGoogleMap( (props) => <TrailChart trail={props.trail} mapStyle={props.mapStyle} /> ))
