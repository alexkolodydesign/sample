import Layout from '../../components/layout/Layout'
import Head from '../../components/layout/Head'
import { nextConnect } from '../../redux/store'
import TrailSystemMap from '../../components/maps/TrailSystemMap'
import TrailSystemGuide from '../../components/menu/TrailSystemGuide'
import MainMenu from '../../components/menu/MainMenu'

const TrailSystem = props =>
  <Layout>
    <Head/>
    <TrailSystemMap/>
    <TrailSystemGuide/>
    <MainMenu/>
  </Layout>

export default nextConnect((state, res) => state)(TrailSystem);
