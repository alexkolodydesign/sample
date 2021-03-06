import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class RegionsData extends React.Component {
  state = { loading: true, regions: [] };

  componentDidMount = () => {
    this.getRegions();
  };

  getRegions = async () => {
    try {
      const { data: regions } = await axios.get('/api/region');
      this.setState({ loading: false, regions });
    } catch (e) {
      // console.log(e);
    }
  };

  render() {
    const { loading, regions } = this.state;
    const { children } = this.props;
    if (loading) return null;
    return children(regions);
  }
}

RegionsData.propTypes = {
  children: PropTypes.func.isRequired
};

export default RegionsData;
