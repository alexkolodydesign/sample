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

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstTimeUser: this.props.map.firstTimeUser == true || this.props.map.firstTimeUser == 'true' ? true : false
    }
    console.log(this.props)
  }
  static getDerivedStateFromProps(props, state) {
    if (process.browser) {
      let { firstTimeUser } = cookies(document)
      if (firstTimeUser === undefined) firstTimeUser = true
      if (firstTimeUser == 'false') firstTimeUser = false
      if (firstTimeUser == 'true') firstTimeUser = true
      return { firstTimeUser }
    }
    return state
  }
  render() {
    // First Time Users Go To OnBoarding!
    const { firstTimeUser } = this.state
    if (firstTimeUser) return (<OnBoarding events={this.props.event} regions={this.props.regions} />)
    return (
      <Layout>
        <Head/>
        <MainMapSetup regions={this.props.regions} />
        {this.props.event.events && <EventList events={this.props.event} />}
        <TrailSystemGuide />
        <MainMenu />
      </Layout>
    )
  }
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
    const resTrails = await fetch(hostUrl + '/api/trails/');
    const trails = await resTrails.json();
    return {
      regions,
      trails,
      event: e_data,
      firstTimeUser: firstTimeUser === undefined ? true : firstTimeUser
    }
  } catch (e) {
    console.log(e)
    return {
      error: true
    };
  }
};

export default nextConnect((state, res) => {
  if (res) {
    let { firstTimeUser } = cookies(res)
    if (firstTimeUser === undefined) firstTimeUser = true
    state.map.firstTimeUser = firstTimeUser
    state.trails = res.trails
    return state
  } else {
    let { firstTimeUser } = cookies(document)
    if (firstTimeUser === undefined) firstTimeUser = true
    state.map.firstTimeUser = firstTimeUser
    state.trails = res.trails
    return state
  }
})(Dashboard);
