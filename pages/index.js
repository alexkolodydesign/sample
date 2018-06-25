import Layout from '../components/layout/Layout'
import Head from '../components/layout/Head'
import { nextConnect } from '../redux/store'
import fetch from 'isomorphic-unfetch';
import { filterAction } from '../redux/filterAction'
import MainMap from '../components/maps/MainMap'
import TrailSystemGuide from '../components/menu/TrailSystemGuide'
import MainMenu from '../components/menu/MainMenu'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const region = filterAction(this.props.region, this.props.map.filter)
    return (
      <Layout>
        <Head/>
        <MainMap regionData={region} />
        <TrailSystemGuide/>
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
    return {
      region: data
    };
  } catch (e) {
    return {
      error: true
    };
  }
};

export default nextConnect((state, res) => state)(Dashboard);
