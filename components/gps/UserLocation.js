import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';
import { connect } from 'react-redux';
import { goToSystem } from '../../redux/actions';

// Redux
const mapStateToProps = (state, ownProps) => ({
  zoom: state.map.zoom,
  ...ownProps
});
const mapDispatchToProps = dispatch => ({
  goToSystem: (zoom, center) => dispatch(goToSystem(zoom, center))
});

class UserLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: false
    };
  }

  componentDidMount() {
    const { goToSystem: goTo, zoom } = this.props;
    const setPosition = pos => this.setState({ userLocation: pos });
    const goToPosition = pos => goTo(zoom, pos);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setPosition(pos);
          // TODO: Locating Toast Message Appears & Disappears
          goToPosition(pos);
        },
        () => {
          // console.log('User Location Not Found!');
        }
      );
    } else {
      // console.log("Browser doesn't support Geolocation");
    }
  }

  render() {
    const { userLocation } = this.state;
    return (
      <React.Fragment>
        {userLocation && <Marker position={userLocation} />}
      </React.Fragment>
    );
  }
}

UserLocation.propTypes = {
  goToSystem: PropTypes.func.isRequired,
  zoom: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLocation);
