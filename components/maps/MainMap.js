import axios from "axios"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import { connect } from 'react-redux'
import { goToSystem, highlightRegion } from '../../redux/actions'
import { filterAction } from '../../redux/filterAction'
import Region from './Region'
import RegionTrail from './RegionTrail'
import UserLocation from './UserLocation'

// Redux
const mapStateToProps = (state, ownProps) => {
  return {
    map: state.map,
    trails: state.trails,
    metricType: state.map.metricType,
    firstTimeUser: state.map.firstTimeUser,
    ...ownProps,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    goToSystem: (zoom, center) => {
      dispatch(goToSystem(zoom, center));
    },
    highlightRegion: name => {
      dispatch(highlightRegion(name))
    }
  };
};

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.zoom = this.zoom.bind(this)
    this.washington_map = React.createRef();
    this.onRegionToggle = this.onRegionToggle.bind(this)
    this.onTrailToggle = this.onTrailToggle.bind(this)
    this.state = { activeRegion: {}, activeTrail: {} }
  }
  zoom(zoom, center, regionName) {
    this.props.highlightRegion(regionName)
    this.props.goToSystem(zoom, center)
  }
  onRegionToggle(region) {
    // if there is an active trail, close it
    if (this.state.activeTrail.props) {
      this.state.activeTrail.toggleMenu() // this closes the current popup
      this.setState({activeTrail:{}})
    }

    // if new is same as current, close
    if (this.state.activeRegion.props && this.state.activeRegion.props.region.regionName == region.props.region.regionName) {
      region.toggleMenu();
      this.setState({activeRegion: {}})
    }
    // if current is set, but is not the one clicked, close the current and set to new
    else if (this.state.activeRegion && this.state.activeRegion.state) {
      this.state.activeRegion.toggleMenu() // this closes the current popup
      this.state.activeRegion.togglePopupMenu(region.regionName); // this will compare the current active to the new and close if needed
      this.setState({activeRegion:region})
      this.state.activeRegion.toggleMenu() // this closes the current popup
    }
    // else there is none set, so start from beginning
    else {
      this.setState({activeRegion:region})
      this.state.activeRegion.toggleMenu() // this closes the current popup

    }
  }
  onTrailToggle(trail, coord) {
    // if there is an active region popup, close it
    if (this.state.activeRegion.props) {
      this.state.activeRegion.toggleMenu() // this closes the current popup
      this.setState({activeRegion:{}})
    }

    // if new is same as current, close
    if (this.state.activeTrail.props && this.state.activeTrail.props.trail.slug == trail.props.trail.slug) {
      trail.toggleMenu(coord);
      this.setState({activeTrail: {}})
    }
    // if current is set, but is not the one clicked, close the current and set to new
    else if (this.state.activeTrail && this.state.activeTrail.state) {
      this.state.activeTrail.toggleMenu(coord) // this closes the current popup
      this.state.activeTrail.togglePopupMenu(trail.slug); // this will compare the current active to the new and close if needed
      this.setState({activeTrail:trail})
      this.state.activeTrail.toggleMenu(coord) // this closes the current popup
    }
    // else there is none set, so start from beginning
    else {
      this.setState({activeTrail:trail})
      this.state.activeTrail.toggleMenu(coord) // this closes the current popup

    }
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
    const regions = this.props.regions
    const zoomState = this.zoom
    const zoomLevel = this.props.map.zoom
    const trails = filterAction(this.props.trails, this.props.map.filters, zoomLevel)
    return (
      <GoogleMap
        zoom={this.props.map.zoom}
        center={this.props.map.center}
        onZoomChanged={function(e) {
          zoomState(this.getZoom(), null)
        }}
        options={{ mapTypeId: this.props.map.mapStyle }}
        defaultOptions={{
          streetViewControl: false
        }}
        ref={this.washington_map}
      >
        {this.props.map.gps && <UserLocation />}
        {trails.map((trail, k) => {
          <RegionTrail onTrailToggle={this.onTrailToggle} trail={trail} key={k} metricType={this.props.metricType}  />
          }
        )}
        {regions.map((region, k) => {
          return <Region region={region} key={k} zoom={this.zoom} zoomLevel={this.props.map.zoom} onRegionToggle={this.onRegionToggle} firstTimeUser={this.props.firstTimeUser} />
        })}
      </GoogleMap>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
