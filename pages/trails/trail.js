import Layout from '../../components/layout/Layout'
import Head from '../../components/layout/Head'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch';
import { nextConnect } from '../../redux/store'
import TrailMap from '../../components/maps/TrailMap'
import TrailSystemGuide from '../../components/menu/TrailSystemGuide'
import TrailSidebar from '../../components/trails/TrailSidebar'
import SimilarTrails from '../../components/trails/SimilarTrails'
import TrailsNearby from '../../components/trails/TrailsNearby'
import TrailMedia from '../../components/trails/TrailMedia'

const Trail = props =>
  <Layout nav={true} background="#f2f2f2" overflow={true}>
    <Head/>
    <div className="wrapper">
      <p><Link href="/"><a>…back to Region View</a></Link></p>
      <h1>Trail Map</h1>
    </div>
    <div className="wrapper trail">
      <TrailSidebar trail={props.trail} />
      <TrailMap/>
    </div>
    <div className="wrapper more_trails">
      <SimilarTrails />
      <TrailsNearby />
    </div>
    <TrailMedia media={props.trail.media} />
    <style jsx>{`
      h1 {
        text-transform: uppercase;
      }
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

Trail.getInitialProps = async props => {
  const hostUrl = props.req ? `${props.req.protocol}://${props.req.get('Host')}` : '';
  const slug = props.asPath.split('/')[2];
  try {
    const res = await fetch(hostUrl + '/api/trail/' + slug);
    const data = await res.json();
    return {
      trail: data.trail
    };
  } catch (e) {
    return {
      error: true
    };
  }
};

export default nextConnect((state, res) => state)(Trail);
