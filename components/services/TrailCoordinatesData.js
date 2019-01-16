import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class TrailCoordinatesData extends React.Component {
  state = { loading: true, coordinates: [], connectorCoordinates: [] };

  componentDidMount = () => {
    this.getTrailCoordinatesData();
  };

  getTrailCoordinatesData = async () => {
    const { url, connectorUrl } = this.props;
    const {
      data: {
        trail: { coordinates }
      }
    } = await axios.get(`/api/coordinates?url=${url}`);
    let connectorCoordinates = [];
    if (connectorUrl) {
      const { data: results } = await axios.get(`/api/coordinates?url=${connectorUrl}`);
      connectorCoordinates = results.trail.coordinates;
    }
    this.setState({ loading: false, coordinates, connectorCoordinates });
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
