import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const { CancelToken } = axios;

class TrailCoordinatesData extends React.Component {
  state = { loading: true, coordinates: [], connectorCoordinates: [] };

  cancel = null;

  componentDidUpdate = prevProps => {
    const { url } = this.props;
    // Given new url re-run call to get new coords
    if (prevProps.url !== url) this.getTrailCoordinatesData();
  };

  componentDidMount = () => {
    this.getTrailCoordinatesData();
  };

  componentWillUnmount = () => {
    // Cancel Requests
    this.cancel();
  };

  getTrailCoordinatesData = async () => {
    const { url, connectorUrl, connectorFiles } = this.props;
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

      if (connectorFiles) {
        for (var cf = 0; cf < connectorFiles.length; cf++) {
          const { data: cf_results } = await axios.get(`/api/coordinates?url=${connectorFiles[cf].connector_trail_json}`);
          connectorCoordinates.push(cf_results.trail.coordinates)
        }
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
