import React from 'react';
import axios from 'axios';

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
      console.log(e);
    }
  };

  render() {
    const { loading, regions } = this.state;
    if (loading) return null;
    return this.props.children(regions);
  }
}

export default RegionsData;
