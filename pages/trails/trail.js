import Layout from '../../components/layout/Layout'
import Head from '../../components/layout/Head'
import Link from 'next/link'
import { nextConnect } from '../../redux/store'
import TrailMap from '../../components/TrailMap'
import TrailSystemGuide from '../../components/TrailSystemGuide'
import TrailSidebar from '../../components/TrailSidebar'
import SimilarTrails from '../../components/SimilarTrails'
import TrailsNearby from '../../components/TrailsNearby'
import TrailMedia from '../../components/TrailMedia'

const Trail = props =>
  <Layout nav={true}>
    <Head/>
    <div className="wrapper">
      <p><Link href="/">…back to Region View</Link></p>
    </div>
    <div className="wrapper trail">
      <TrailSidebar />
      <TrailMap/>
    </div>
    <div className="wrapper more_trails">
      <SimilarTrails />
      <TrailsNearby />
    </div>
    <TrailMedia />
    <style jsx>{`
      .trail {
        display: grid;
        grid-template-columns: 30rem 1fr;
        grid-gap: 3rem;
      }
      .more_trails {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 3rem;
      }
    `}</style>
  </Layout>

export default nextConnect((state, res) => state)(Trail);
