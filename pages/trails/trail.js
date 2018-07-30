import Layout from '../../components/layout/Layout'
import { nextConnect } from '../../redux/store'
import Head from '../../components/layout/Head'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import TrailSidebar from '../../components/trails/TrailSidebar'
import TrailMap from '../../components/maps/TrailMap'
import SimilarTrails from '../../components/trails/SimilarTrails'
import NearbyTrails from '../../components/trails/NearbyTrails'
import TrailMedia from '../../components/trails/TrailMedia'
import ScrollToTop from 'react-scroll-up'
import { BarLoader } from 'react-spinners'


const Trail = props => {
  if (props.error) return (
    <Layout nav={false} background="#f2f2f2" overflow={true}>
      <div className="wrapper">
        It appears this Trail no longer exists or another error has occurred.
      </div>
    </Layout>
  )
  return (
    <Layout nav={false} background="#f2f2f2" overflow={true}>
      <Head/>
      <div className="wrapper">
        <Link href="/">
          <a style={{paddingTop: "3rem"}}>
            <button>
              &lt; Back to map
            </button>
          </a>
        </Link>
        <h1 dangerouslySetInnerHTML={{__html: props.trail.title.rendered}} />
      </div>
      <div className="wrapper trail">
        <TrailSidebar trail={props.trail} />
        <TrailMap trail={props.trail} />
      </div>
      <div className="wrapper more_trails">
        {props.trail.custom_data.similarTrails.length ? <SimilarTrails similarTrails={props.trail.custom_data.similarTrails} /> : false }
        {props.trail.custom_data.similarTrails.length ? <NearbyTrails nearbyTrails={props.trail.custom_data.nearbyTrails} /> : false }
      </div>
      <TrailMedia media={props.trail.custom_data.media} />
      <ScrollToTop showUnder={160} style={{background: '#4d4e4e', padding: '0.75rem'}}>
        <img width="20" height="20" src="/static/images/scrollup.svg" alt="scroll to top" />
      </ScrollToTop>

      <style jsx>{`
        @media screen {
          h1 {
            text-transform: uppercase;
            font-size: 3.5rem;
          }
          .trail {
            display: grid;
            grid-template-columns: 30rem 1fr;
            grid-gap: 3rem;
          }
          .more_trails {
            margin-top: 3rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 3rem;
          }
          button {
            border: none;
            border-radius: 0.25rem;
            background: #262727;
            padding: 0.5rem 2rem;
            color: #fff;
            font-size: 1.8rem;
            cursor: pointer;
            transition: all 500ms;
            flex: 50%;
            flex-wrap: wrap;
            margin-top: 1.5rem;
            &:hover {
              background: #666666;
            }
          }
        }
        @media print {
          *, *:before, *:after {
            display: none;
          }
          .wrapper.trail, h1 {
            display: block;
            max-width: 100%;
          }
        }

      `}</style>
    </Layout>
  )
}

Trail.getInitialProps = async props => {
  const hostUrl = props.req ? `${props.req.protocol}://${props.req.get('Host')}` : '';
  const slug = props.asPath.split('/')[2];
  try {
    const res = await fetch(hostUrl + '/api/trail/' + slug);
    const data = await res.json();
    return {
      trail: data
    };
  } catch (e) {
    return {
      error: true
    };
  }
};

export default nextConnect((state, res) => state)(Trail);
