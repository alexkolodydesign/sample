import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class TrailsData extends React.Component {
  state = { loading: true, trails: [] };

  componentDidMount = () => {
    this.getTrailsData();
  };

  getTrailsData = async () => {
    const { data: trails } = await axios.get('/api/trails');
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
