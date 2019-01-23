import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
const CancelToken = axios.CancelToken;

class TrailsData extends React.Component {
  state = { loading: true, trails: [] };

  cancel = null;

  componentDidMount = () => {
    this.getTrailsData();
  };

  componentWillUnmount = () => {
    // Cancel Requests
    this.cancel();
  };

  getTrailsData = async () => {
    const { data: trails } = await axios.get('/api/trails', {
      cancelToken: new CancelToken(c => {
        this.cancel = c;
      })
    });
    this.setState({ loading: false, trails });
  };

  render() {
    const { children } = this.props;
    return children(this.state);
  }
}

TrailsData.propTypes = {
  children: PropTypes.func.isRequired
};

export default TrailsData;
