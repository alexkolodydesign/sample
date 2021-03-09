import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Head from '../components/shared/Head';
import EventList from '../components/events/EventList';
import MainMapSetup from '../components/maps/MainMapSetup';
import TrailSystemGuide from '../components/maps/TrailSystemGuide';
import MainMenu from '../components/menus/MainMenu';

// Update heroku stack

const Onboarding = dynamic(() => import('../components/maps/Onboarding'));

export const TrailsContext = React.createContext();

const Dashboard = ({ firstTimeUser }) => (
  <>
    <Head />
    <main>
      {firstTimeUser ? <Onboarding /> : <MainMapSetup />}
      <TrailSystemGuide />
      <EventList />
      <MainMenu showSEO />
    </main>
  </>
);

Dashboard.propTypes = {
  firstTimeUser: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  firstTimeUser: state.map.firstTimeUser
});
export default connect(
  mapStateToProps,
  null
)(Dashboard);
