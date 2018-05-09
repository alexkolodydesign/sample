import Layout from '../../components/layout/Layout'
import Head from '../../components/layout/Head'
import { nextConnect } from '../../redux/store'
import TrailSystemMap from '../../components/TrailSystemMap'
import TrailSystemGuide from '../../components/TrailSystemGuide'
import MainMenu from '../../components/MainMenu'

const TrailSystem = props =>
  <Layout>
    <Head/>
    <TrailSystemMap/>
    <TrailSystemGuide/>
    <MainMenu/>
  </Layout>

export default nextConnect((state, res) => state)(TrailSystem);
