import React from 'react';
import ReactJoyride, { STATUS } from 'react-joyride';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainMapSetup from './MainMapSetup';

class OnBoarding extends React.Component {
  state = {
    run: false,
    showOnboardingMessage: true,
    loading: true,
    steps: [
      {
        title: 'Dashboard',
        content: <p>The 5 main regions of Washington County.</p>,
        placement: 'center',
        disableBeacon: true,
        styles: {
          options: {
            zIndex: 10000
          }
        },
        target: 'body'
      },
      {
        title: 'Popular Trail Systems',
        content: <p>Click here to zoom into trails around this area.</p>,
        placement: 'auto',
        disableBeacon: true,
        styles: {
          options: {
            zIndex: 10000
          }
        },
        target: '.systems'
      },
      {
        title: 'Trail Types Filter',
        content: <p>Toggle filters for what kind of trails you&#39;re interested in.</p>,
        placement: 'auto',
        disableBeacon: true,
        styles: {
          options: {
            zIndex: 10000
          }
        },
        target: '.trails'
      },
      {
        title: 'More Filters',
        content: <p>Narrow down your search even more using specific filters.</p>,
        placement: 'auto',
        disableBeacon: true,
        styles: {
          options: {
            zIndex: 10000
          }
        },
        target: '.filters'
      },
      {
        title: 'View Trails',
        content: <p>View trails that fit your search criteria.</p>,
        placement: 'auto',
        disableBeacon: true,
        styles: {
          options: {
            zIndex: 10000
          }
        },
        target: '.trail_list'
      },
      {
        title: 'GPS',
        content: <p>Find your location on the map.</p>,
        placement: 'auto',
        disableBeacon: true,
        styles: {
          options: {
            zIndex: 10000
          }
        },
        target: '.gps'
      },
      {
        title: 'Settings',
        content: <p>Switch from standard to metric system, change map view, and more.</p>,
        placement: 'auto',
        disableBeacon: true,
        styles: {
          options: {
            zIndex: 10000
          }
        },
        target: '.settings'
      }
    ]
  };

  componentDidMount = () => {
    this.setState({ loading: false });
  };

  setCookie = () => {
    document.cookie = 'firstTimeUser=false';
  };

  toggleFirstTimeUser = () => {
    const { toggleFirstTimeUser } = this.props;
    this.setCookie();
    toggleFirstTimeUser(false);
  };

  handleClickStart = e => {
    e.preventDefault();
    this.setState({ run: true, showOnboardingMessage: false });
  };

  handleJoyrideCallback = data => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      this.setCookie();
      this.toggleFirstTimeUser(false);
      this.setState({ run: false });
    }
  };

  render() {
    const { run, showOnboardingMessage, loading, steps } = this.state;
    if (loading) return null;
    return (
      <div>
        <ReactJoyride
          callback={this.handleJoyrideCallback}
          continuous
          run={run}
          scrollToFirstStep
          showProgress
          showSkipButton
          steps={steps}
        />
        {showOnboardingMessage && (
          <section className="onboarding">
            <div className="wrapper">
              <div className="onboarding_message">
                <h1>
                  Welcome to
                  <br />
                  <span>Washington County Trails</span>
                </h1>
                <button className="cta" onClick={this.handleClickStart} type="button">
                  Explore Our Trails
                </button>
                <button
                  type="button"
                  style={{
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    width: '100%'
                  }}
                  onClick={() => {
                    this.setState({ showOnboardingMessage: false });
                    return this.toggleFirstTimeUser(false);
                  }}
                >
                  Skip Short Tutorial
                </button>
              </div>
            </div>
          </section>
        )}
        <MainMapSetup />
        <style jsx>
          {`
            h1 {
              font-size: 2.2rem;
              text-transform: uppercase;
              font-weight: 100;
              color: #4d4e4e;
              span {
                font-weight: 700;
                font-size: 2.8rem;
              }
            }
            .onboarding {
              position: fixed;
              z-index: 3;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              background: rgba(255, 255, 255, 0.9);
            }
            .cta {
              padding: 1rem 2rem;
              background: #0d93f2;
              color: #fff;
              border: none;
              border-radius: 0.5rem;
              font-size: 1.7rem;
              cursor: pointer;
              transition: all 500ms;
              &:hover {
                background: #262727;
                &.active {
                  background: #0d93f2;
                }
              }
              &.active {
                background: #3fa9f5;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

OnBoarding.propTypes = {
  toggleFirstTimeUser: PropTypes.func.isRequired,
  joyride: PropTypes.shape({})
};

OnBoarding.defaultProps = {
  joyride: {}
};

// Redux
const mapStateToProps = state => ({ firstTimeUser: state.map.firstTimeUser });
const mapDispatchToProps = dispatch => ({
  toggleFirstTimeUser: status => dispatch({ type: 'TOGGLE_FIRST_TIME_USER', status })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnBoarding);
