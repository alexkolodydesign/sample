import {  Marker, Polygon, InfoWindow } from "react-google-maps"
import alpineCoordinates from '../../data/alpine-coordinates'
import desertCoordinates from '../../data/desert-coordinates'
import canyonCoordinates from '../../data/canyon-coordinates'
import mesaCoordinates from '../../data/mesa-coordinates'
import urbanCoordinates from '../../data/urban-coordinates'

export default class Region extends React.Component {
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
    return (
      <React.Fragment>
        {this.props.zoomLevel < 12 &&
          <Polygon
            paths={coordinates}
            options={{
              strokeColor:"#000000",
              strokeOpacity:0.8,
              strokeWeight:1,
              fillColor:"#000000",
              fillOpacity:0.35
            }}
            onMouseOver={function() { this.setOptions({fillOpacity: 0.5}) }}
            onMouseOut={function() { this.setOptions({fillOpacity: 0.35}) }}
            onClick={() => this.props.zoom( 13, {lat: region.markerCoordinates.lat, lng: region.markerCoordinates.lng} )}
          />
        }
        {this.props.zoomLevel < 12 &&
          <Marker
            position={{lat: region.markerCoordinates.lat, lng: region.markerCoordinates.lng}}
            icon={{
              url: region.markerIcon,
              scaledSize: new google.maps.Size(55,55)
            }}
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
