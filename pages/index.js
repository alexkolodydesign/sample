import fetch from 'isomorphic-unfetch'
import cookies from 'next-cookies'
import OnBoarding from '../components/OnBoarding'
import Layout from '../components/layout/Layout'
import Head from '../components/layout/Head'
import { nextConnect } from '../redux/store'
import { filterAction } from '../redux/filterAction'
import MainMapSetup from '../components/maps/MainMapSetup'
import TrailSystemGuide from '../components/menu/TrailSystemGuide'
import MainMenu from '../components/menu/MainMenu'
import EventList from '../components/menu/EventList'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const region = filterAction(this.props.region, this.props.map.filter)
    const { firstTimeUser } = cookies(this.props)
    // First Time Users Go To OnBoarding!
    if (firstTimeUser == true || firstTimeUser == 'true') return (<OnBoarding regionData={region} events={this.props.event} region={region} />)
    return (
      <Layout>
        <Head/>
        <MainMapSetup regionData={region} />
        {this.props.event.events &&
            <EventList events={this.props.event} />
        }
        <TrailSystemGuide />
        <MainMenu system={region} />
      </Layout>
    )
  }
}

Dashboard.getInitialProps = async props => {
  const hostUrl = props.req ? `${props.req.protocol}://${props.req.get('Host')}` : '';
  const slug = props.asPath.split('/')[2];
  try {
    const res = await fetch(hostUrl + '/api/region' );
    const data = await res.json();
    const e_res = await fetch(hostUrl + '/api/washco_event' );
    const e_data = await e_res.json();
    const { firstTimeUser } = cookies(props)
    return {
      region: data,
      event: e_data,
      firstTimeUser: firstTimeUser === undefined ? true : firstTimeUser
    };
  } catch (e) {
    return {
      error: true
    };
  }
};

export default nextConnect((state, res) => {
  state.map.firstTimeUser = res.firstTimeUser
  return state
})(Dashboard);
