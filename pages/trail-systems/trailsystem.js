import Layout from '../../components/layout/Layout'
import Head from '../../components/layout/Head'
import fetch from 'isomorphic-unfetch';
import { nextConnect } from '../../redux/store'
import TrailSystemMap from '../../components/maps/TrailSystemMap'
import TrailSystemGuide from '../../components/menu/TrailSystemGuide'
import MainMenu from '../../components/menu/MainMenu'

const TrailSystem = props =>
  <Layout>
    <Head/>
    <TrailSystemMap/>
    <TrailSystemGuide system={props.trailSystem.handle} />
    <MainMenu system={props.trailSystem} />
  </Layout>

TrailSystem.getInitialProps = async props => {
  const hostUrl = props.req ? `${props.req.protocol}://${props.req.get('Host')}` : '';
  const slug = props.asPath.split('/')[2];
  try {
    const res = await fetch(hostUrl + '/api/trailsystem/' + slug);
    const data = await res.json();
    return {
      trailSystem: data.trailSystem
    };
  } catch (e) {
    return {
      error: true
    };
  }
};

export default nextConnect((state, res) => state)(TrailSystem);
