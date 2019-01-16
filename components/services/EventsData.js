import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class EventsData extends React.Component {
  state = { loading: true, events: [] };

  componentDidMount = () => {
    this.getEvents();
  };

  getEvents = async () => {
    const { data: events } = await axios.get('/api/washco_event');
    this.setState({ loading: false, events });
  };

  render() {
    const { children } = this.props;
    return children(this.state);
  }
}

EventsData.propTypes = {
  children: PropTypes.func.isRequired
};

export default EventsData;
