import Joyride from "react-joyride";
import { connect } from 'react-redux'

import Layout from '../components/layout/Layout'
import Head from '../components/layout/Head'
import { nextConnect } from '../redux/store'
import MainMapSetup from '../components/maps/MainMapSetup'
import { toggleFirstTimeUser } from '../redux/actions'
import TrailSystemGuide from '../components/menu/TrailSystemGuide'
import MainMenu from '../components/menu/MainMenu'
import EventList from '../components/menu/EventList'

// Redux
const mapStateToProps = (state, ownProps) => {
  return {
    firstTimeUser: state.map.firstTimeUser,
    ...ownProps
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleFirstTimeUser: status => {
      dispatch(toggleFirstTimeUser(status));
    }
  }
};

class OnBoarding extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      run: false,
      showOnboardingMessage: true,
      loading: true
    };
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this)
    this.handleClickStart = this.handleClickStart.bind(this)
    this.setCookie = this.setCookie.bind(this)
    this.toggleFirstTimeUser = this.toggleFirstTimeUser.bind(this)
  }
  componentDidMount() {
    this.setState({loading: false})
  }
  setCookie() {
    document.cookie = 'firstTimeUser=false'
  }
  toggleFirstTimeUser() {
    this.setCookie()
    this.props.toggleFirstTimeUser(false)
  }
  handleClickStart(e) {
    e.preventDefault();
    this.setState({ run: true, showOnboardingMessage: false });
  }
  handleJoyrideCallback(data) {
    const { joyride } = this.props;
    const { type } = data;
    if (typeof joyride.callback === "function") joyride.callback(data);
    else if (data.status == 'finished' || data.status == 'skipped') {
      this.setCookie()
      this.toggleFirstTimeUser(false)
    }
  }
  render() {
    const { run } = this.state;
    return (
      <Layout>
        <Head/>
        {!this.state.loading &&
          <Joyride
            continuous
            scrollToFirstStep
            showProgress
            showSkipButton
            run={run}
            steps={[
              {
                title: "Dashboard",
                content: <p>The 5 main regions of Washington County.</p>,
                placement: "center",
                disableBeacon: true,
                styles: {
                  options: {
                    zIndex: 10000
                  }
                },
                target: "body"
              },
              {
                title: "Popular Trail Systems",
                content: <p>Click here to zoom into trails around this area.</p>,
                placement: "auto",
                disableBeacon: true,
                styles: {
                  options: {
                    zIndex: 10000
                  }
                },
                target: ".systems"
              },
              {
                title: "Trail Types Filter",
                content: <p>Toggle filters for what kind of trails you're interested in.</p>,
                placement: "auto",
                disableBeacon: true,
                styles: {
                  options: {
                    zIndex: 10000
                  }
                },
                target: ".trails"
              },
              {
                title: "More Filters",
                content: <p>Narrow down your search even more using specific filters.</p>,
                placement: "auto",
                disableBeacon: true,
                styles: {
                  options: {
                    zIndex: 10000
                  }
                },
                target: ".filters"
              },
              {
                title: "View Trails",
                content: <p>View trails that fit your search criteria.</p>,
                placement: "auto",
                disableBeacon: true,
                styles: {
                  options: {
                    zIndex: 10000
                  }
                },
                target: ".trail_list"
              },
              {
                title: "GPS",
                content: <p>Find your location on the map.</p>,
                placement: "auto",
                disableBeacon: true,
                styles: {
                  options: {
                    zIndex: 10000
                  }
                },
                target: ".gps"
              },
              {
                title: "Settings",
                content: <p>Switch from imperial to metric system, change map view, and more.</p>,
                placement: "auto",
                disableBeacon: true,
                styles: {
                  options: {
                    zIndex: 10000
                  }
                },
                target: ".settings"
              }
            ]}
            callback={this.handleJoyrideCallback}
          />
        }

        {this.state.showOnboardingMessage &&
          <section className="onboarding">
            <div className="wrapper">
              <div className="onboarding_message">
                <h1>Welcome to<br/><span>Washington County Trails</span></h1>
                <button className="cta" onClick={this.handleClickStart}>Explore Our Trails</button>
                <p onClick={() => {
                  this.setState({showOnboardingMessage: false})
                  return this.toggleFirstTimeUser(false)
                }}>Skip Short Tutorial</p>
              </div>
            </div>
          </section>
        }
        <MainMapSetup regions={this.props.regions} />
        {this.props.events.events &&
            <EventList events={this.props.events} />
        }
        <TrailSystemGuide />
        <MainMenu system={this.props.regionData} />

        <style jsx>{`
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
          .onboarding_message {
            p {
              cursor: pointer;
            }
          }
        `}</style>

      </Layout>
    );
  }
}

OnBoarding.defaultProps = {
  joyride: {}
}

export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding)
