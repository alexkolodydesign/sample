import { Marker } from "react-google-maps"
import { connect } from 'react-redux'
import { goToSystem } from '../../redux/actions'

// Redux
const mapStateToProps = (state, ownProps) => {
  return {
    zoom: state.map.zoom,
    ...ownProps
  };
};
const mapDispatchToProps = dispatch => {
  return {
    goToSystem: (zoom, center) => dispatch(goToSystem(zoom, center))
  };
};

class UserLocation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userLocation: false
    }
  }
  componentDidMount() {
    const setPosition = (pos) => this.setState({userLocation: pos})
    const goToPosition = (pos) => this.props.goToSystem(this.props.zoom, pos)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setPosition(pos)
        // TODO: Locating Toast Message Appears & Disappears
        goToPosition(pos)
      }, function() {
        console.log("User Location Not Found!")
      });
    } else {
      console.log("Browser doesn't support Geolocation")
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.state.userLocation && <Marker position={this.state.userLocation} />}
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLocation)
