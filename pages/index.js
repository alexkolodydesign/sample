import fetch from 'isomorphic-unfetch'
import cookies from 'next-cookies'
import OnBoarding from '../components/OnBoarding'
import Layout from '../components/layout/Layout'
import Head from '../components/layout/Head'
import { nextConnect } from '../redux/store'
import MainMapSetup from '../components/maps/MainMapSetup'
import TrailSystemGuide from '../components/menu/TrailSystemGuide'
import MainMenu from '../components/menu/MainMenu'
import EventList from '../components/menu/EventList'

const Dashboard = props => {
  // First Time Users Go To OnBoarding!
  if (props.firstTimeUser == true || props.firstTimeUser == 'true') return (<OnBoarding events={props.event} regions={props.regions} />)
  return (
    <Layout>
      <Head/>
      <MainMapSetup regions={props.regions} />
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
    const regions = await res.json();
    const e_res = await fetch(hostUrl + '/api/washco_event' );
    const e_data = await e_res.json();
    const { firstTimeUser } = props.req ? cookies(props) : cookies(window)
    if (props.req) {
      const resTrails = await fetch(hostUrl + '/api/trails/');
      const trails = await resTrails.json();
      return {
        regions,
        trails,
        event: e_data,
        firstTimeUser: firstTimeUser === undefined ? true : firstTimeUser
      }
    } else {
      return {
        regions,
        event: e_data,
        firstTimeUser: firstTimeUser === undefined ? true : firstTimeUser
      }
    }
  } catch (e) {
    console.log(e)
    return {
      error: true
    };
  }
};

export default nextConnect((state, res) => {
  state.map.firstTimeUser = res.firstTimeUser
  if (res.trails) {
    state.map.trails = res.trails
  }
  return state
})(Dashboard);
