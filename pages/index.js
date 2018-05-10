import Layout from '../components/layout/Layout'
import Head from '../components/layout/Head'
import { nextConnect } from '../redux/store'
import RegionMap from '../components/maps/RegionMap'
import TrailSystemGuide from '../components/menu/TrailSystemGuide'
import MainMenu from '../components/menu/MainMenu'

const Dashboard = props =>
  <Layout>
    <Head/>
    <RegionMap map={props.map} />
    <TrailSystemGuide/>
    <MainMenu/>
  </Layout>

export default nextConnect((state, res) => state)(Dashboard);
