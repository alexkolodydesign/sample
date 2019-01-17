import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
const CancelToken = axios.CancelToken;

class TrailCoordinatesData extends React.Component {
  state = { loading: true, coordinates: [], connectorCoordinates: [] };

  cancel = null;

  componentDidMount = () => {
    this.getTrailCoordinatesData();
  };

  componentWillUnmount = () => {
    // Cancel Requests
    this.cancel();
  };

  getTrailCoordinatesData = async () => {
    const { url, connectorUrl } = this.props;
    try {
      const {
        data: {
          trail: { coordinates }
        }
      } = await axios.get(`/api/coordinates?url=${url}`, {
        cancelToken: new CancelToken(c => {
          this.cancel = c;
        })
      });
      let connectorCoordinates = [];
      if (connectorUrl) {
        const { data: results } = await axios.get(`/api/coordinates?url=${connectorUrl}`);
        connectorCoordinates = results.trail.coordinates;
      }
      this.setState({ loading: false, coordinates, connectorCoordinates });
    } catch (e) {
      // Coordinates have been cancelled
      // console.log(e);
    }
  };

  render() {
    const { children } = this.props;
    return children(this.state);
  }
}

TrailCoordinatesData.propTypes = {
  children: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  connectorUrl: PropTypes.string
};

TrailCoordinatesData.defaultProps = {
  connectorUrl: null
};

export default TrailCoordinatesData;
