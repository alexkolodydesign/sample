import React from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import getHostUrl from '../utils/getHostUrl';
import Head from '../components/shared/Head';
import EventList from '../components/events/EventList';
import MainMapSetup from '../components/maps/MainMapSetup';
import TrailSystemGuide from '../components/maps/TrailSystemGuide';
import { regionsShape, trailsShape } from '../utils/propTypes';
import MainMenu from '../components/menus/MainMenu';

const Onboarding = dynamic(() => import('../components/maps/Onboarding'));

const Dashboard = ({ regions, trails, firstTimeUser }) => (
  <>
    <Head />
    {firstTimeUser ? (
      <Onboarding regions={regions} trails={trails} />
    ) : (
      <MainMapSetup regions={regions} trails={trails} />
    )}
    <TrailSystemGuide />
    <EventList />
    <MainMenu trails={trails} />
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
  regions: regionsShape.isRequired,
  trails: trailsShape.isRequired,
  firstTimeUser: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({ firstTimeUser: state.map.firstTimeUser });
export default connect(
  mapStateToProps,
  null
)(Dashboard);
