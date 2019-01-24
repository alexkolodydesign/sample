import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';
import { connect } from 'react-redux';

class UserLocation extends React.Component {
  state = { userLocation: false };

  setPosition = pos => this.setState({ userLocation: pos });

  goToPosition = pos => {
    const { goToSystem, zoom } = this.props;
    goToSystem(zoom, pos);
  };

  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.setPosition(pos);
          // TODO: Locating Toast Message Appears & Disappears
          this.goToPosition(pos);
        },
        () => {
          // console.log('User Location Not Found!');
        }
      );
    } else {
      // console.log("Browser doesn't support Geolocation");
    }
  };

  render() {
    const { userLocation } = this.state;
    return <>{userLocation && <Marker position={userLocation} />}</>;
  }
}

UserLocation.propTypes = {
  goToSystem: PropTypes.func.isRequired,
  zoom: PropTypes.number.isRequired
};

// Redux
const mapStateToProps = state => ({ zoom: state.map.zoom });
const mapDispatchToProps = dispatch => ({
  goToSystem: (zoom, center) => {
    const location = { zoom, center };
    return dispatch({ type: 'GO_TO_SYSTEM', location });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLocation);
