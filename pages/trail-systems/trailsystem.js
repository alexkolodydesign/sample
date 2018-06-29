import Layout from '../../components/layout/Layout'
import Head from '../../components/layout/Head'
import fetch from 'isomorphic-unfetch';
import { nextConnect } from '../../redux/store'
import { filterAction } from '../../redux/filterAction'
import TrailSystemMap from '../../components/maps/TrailSystemMap'
import TrailSystemGuide from '../../components/menu/TrailSystemGuide'
import MainMenu from '../../components/menu/MainMenu'

class TrailSystem extends React.Component {
  constructor(props) {
    super(props)
    this.filterTrails = this.filterTrails.bind(this)
  }
  filterTrails() {
    return filterAction(this.props.trailSystem, this.props.map.filter)
  }
  render() {
    if (this.props.error) return (
      <Layout>
        <div className="wrapper">
          An Error has occured.
        </div>
      </Layout>
    )
    const trailSystem = this.filterTrails(this.props.trailSystem)
    return (
      <Layout>
        <Head/>
        <TrailSystemMap system={trailSystem}/>
        <TrailSystemGuide system={this.props.trailSystem.handle} />
        <MainMenu system={trailSystem} />
      </Layout>
    )
  }
}

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
