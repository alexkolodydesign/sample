import React, { Component } from 'react';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
    gtmId: 'GTM-MFQ7DJ4'
};

const injectGA = () => {
  ReactGA.initialize('UA-130505850-1');
  ReactGA.pageview(window.location.pathname);
};

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    injectGA()
    TagManager.initialize(tagManagerArgs)
  }
  render() {
    return (
      <footer>
        <div className="wrapper">
          <p>Designed by Flitch Creative</p>
        </div>
        <style jsx>{`
          footer {
            display: none;
          }
        `}</style>
      </footer>
    )
  }
}

export default Footer
