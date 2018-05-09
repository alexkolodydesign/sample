import Layout from '../components/layout/Layout'
import Head from '../components/layout/Head'
import { nextConnect } from '../redux/store'
import RegionMap from '../components/RegionMap'
import TrailSystemGuide from '../components/TrailSystemGuide'
import MainMenu from '../components/MainMenu'

const Dashboard = props =>
  <Layout>
    <Head/>
    <RegionMap/>
    <TrailSystemGuide/>
    <MainMenu/>
  </Layout>

export default nextConnect((state, res) => state)(Dashboard);
