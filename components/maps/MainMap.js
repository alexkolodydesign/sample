import axios from "axios"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import { connect } from 'react-redux'
import { goToSystem } from '../../redux/actions'
import Region from './Region'
import RegionTrail from './RegionTrail'
import UserLocation from './UserLocation'

// Redux
const mapStateToProps = (state, ownProps) => {
  return {
    map: state.map,
    ...ownProps
  };
};
const mapDispatchToProps = dispatch => {
  return {
    goToSystem: (zoom, center) => {
      dispatch(goToSystem(zoom, center));
    }
  };
};

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.zoom = this.zoom.bind(this)
    this.washington_map = React.createRef();
  }
  zoom(zoom, center) {
    this.props.goToSystem(zoom, center)
  }
  componentDidMount() {
    if (window.innerWidth >= 768 && window.innerWidth < 991) {
      this.props.goToSystem(9, this.props.map.center)
    } else if (window.innerWidth >= 992 && window.innerWidth < 1500) {
      this.props.goToSystem(10, this.props.map.center)
    } else if (window.innerWidth > 1500) {
      this.props.goToSystem(11, this.props.map.center)
    } else {
      this.props.goToSystem(8, this.props.map.center)
    }
  }
  render() {
    const zoomState = this.zoom
    return (
      <GoogleMap
        zoom={this.props.map.zoom}
        center={this.props.map.center}
        onZoomChanged={function(e) {
          zoomState(this.getZoom(), null)
        }}
        defaultOptions={{
          streetViewControl: false
        }}
        ref={this.washington_map}
      >
        {this.props.map.gps && <UserLocation />}
        {this.props.regionData.regions.map((region, k) => <Region region={region} key={k} zoom={this.zoom} zoomLevel={this.props.map.zoom} /> )}
        {this.props.regionData.trails.map((trail, k) => <RegionTrail trail={trail} key={k} zoomLevel={this.props.map.zoom} />)}
      </GoogleMap>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
