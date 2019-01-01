import React from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-unfetch';
import getHostUrl from '../utils/getHostUrl';
import Head from '../components/shared/Head';
import EventList from '../components/events/EventList';
import MainMapSetup from '../components/maps/MainMapSetup';
import { regionsShape } from '../lib/propTypes';

const Dashboard = ({ regions }) => (
  <>
    <Head />
    <MainMapSetup regions={regions} />
    <EventList />
  </>
);

Dashboard.getInitialProps = async props => {
  const hostUrl = getHostUrl(props);
  try {
    const res = await fetch(`${hostUrl}/api/region`);
    const regions = await res.json();
    const resTrails = await fetch(`${hostUrl}/api/trails/`);
    const trails = await resTrails.json();
    return {
      regions,
      trails
    };
  } catch (e) {
    // console.log(e);
    return {
      error: true
    };
  }
};

Dashboard.propTypes = {
  regions: regionsShape.isRequired
};

// Connect page to redux store & return firstTimeUser value
const mapStateToProps = state => ({ firstTimeUser: state.map.firstTimeUser });
export default connect(
  mapStateToProps,
  null
)(Dashboard);
