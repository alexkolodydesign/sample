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

const Dashboard = props => {
  const region = filterAction(props.region, props.map.filter)
  const { firstTimeUser } = cookies(props)
  // First Time Users Go To OnBoarding!
  if (firstTimeUser == true || firstTimeUser == 'true') return (<OnBoarding regionData={region} events={props.event} region={region} />)
  return (
    <Layout>
      <Head/>
      <MainMapSetup regionData={region} />
      {props.event.events &&
          <EventList events={props.event} />
      }
      <TrailSystemGuide />
      <MainMenu />
    </Layout>
  )
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
      regions: data.regions,
      trails: data.trails,
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
  state.map.trails = res.trails
  return state
})(Dashboard);
