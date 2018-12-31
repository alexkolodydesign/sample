import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
// import Layout from '';

const Dashboard = ({ firstTimeUser }) => (
  <>
    <h1>Hello World! {firstTimeUser ? 'yay' : 'nay'}</h1>
    <Link href="/test">Click here</Link>
  </>
);

// Connect page to redux store & return firstTimeUser value
const mapStateToProps = state => ({ firstTimeUser: state.map.firstTimeUser });
export default connect(
  mapStateToProps,
  null
)(Dashboard);
