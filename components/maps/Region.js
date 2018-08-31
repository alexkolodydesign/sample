import {  Marker, Polygon, InfoWindow, GroundOverlay } from "react-google-maps"
import cookies from 'next-cookies'
import { fitBounds } from 'google-map-react/utils'
import LatLng from 'google-map-react/lib/utils/lib_geo/lat_lng.js'
import LatLngBounds from 'google-map-react/lib/utils/lib_geo/lat_lng_bounds.js'

import alpineCoordinates from '../../data/alpine-coordinates'
import desertCoordinates from '../../data/desert-coordinates'
import canyonCoordinates from '../../data/canyon-coordinates'
import mesaCoordinates from '../../data/mesa-coordinates'
import urbanCoordinates from '../../data/urban-coordinates'

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
    let coordinates
    switch(region.regionName) {
      case 'Alpine':
        coordinates = alpineCoordinates
        break
      case 'Desert':
        coordinates = desertCoordinates
        break
      case 'Canyon':
        coordinates = canyonCoordinates
        break
      case 'Mesa':
        coordinates = mesaCoordinates
        break
      case 'Urban':
        coordinates = urbanCoordinates
        break
      default:
        coordinates = []
    }
    // Make new bounds
    let newBounds = new LatLngBounds()
    // Add LatLng points to the new bounding area
    coordinates.forEach(bound => newBounds.extend(new LatLng(bound.lat, bound.lng)))
    const firstTimeUser = this.props.firstTimeUser
    if (!coordinates) return null
    return (
      <React.Fragment>
        {this.props.zoomLevel < 12 &&
          <React.Fragment>
            <GroundOverlay
              defaultUrl={region.overlayImage}
              defaultBounds={new google.maps.LatLngBounds(
                newBounds.getSouthWest(),
                newBounds.getNorthEast()
              )}
              defaultOpacity={firstTimeUser == true ? 1 : 0}
            />
            <Polygon
              paths={coordinates}
              options={{
                strokeColor:"#FFF",
                strokeOpacity:1,
                strokeWeight:3,
                fillColor:"#ffffff",
                fillOpacity:0
              }}
              onMouseOver={function() { this.setOptions({fillOpacity: .5}) }}
              onMouseOut={function() { this.setOptions({fillOpacity: 0}) }}
              onClick={() => this.props.zoom( 13, {lat: region.markerCoordinates.lat, lng: region.markerCoordinates.lng} )}
            />
          </React.Fragment>
        }
        {this.props.zoomLevel < 12 &&
          <Marker
            position={{lat: region.markerCoordinates.lat, lng: region.markerCoordinates.lng}}
            icon={{
              url: region.markerIcon,
              scaledSize: new google.maps.Size(68,68)
            }}
            onClick={this.toggleMenu}
          >
            {
              this.state.menu &&
              <InfoWindow onCloseClick={() => this.setState({menu: false})}>
                <div className="info_wrapper">
                  <h3>{region.regionName}</h3>
                  <img src={region.regionImage} alt=""/>
                  <p className="explore" onClick={() => this.props.zoom( 12, {lat: region.markerCoordinates.lat, lng: region.markerCoordinates.lng} )}>Explore Region</p>
                </div>
              </InfoWindow>
            }
          </Marker>
        }
        <style jsx>{`
          .explore {
            color: #3fa9f5;
            cursor: pointer;
            font-weight: 500;
          }
          .info_wrapper img {
            max-width: 150px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default Region
