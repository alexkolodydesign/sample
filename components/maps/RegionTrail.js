import { InfoWindow, Marker } from "react-google-maps"
import { connect } from 'react-redux'
import axios from 'axios'
import { updateTrailCoords } from '../../redux/actions'
import Link from 'next/link'
import Paths from './Paths'
import Difficulty from './Difficulty'

// Redux
const mapStateToProps = (state, ownProps) => {
  return {
    map: state.map,
    trails: state.trails,
    ...ownProps
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateTrailCoords: (coords, slug) => {
      dispatch(updateTrailCoords(coords, slug));
    }
  };
};

class RegionTrail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { coordinates: [], menu: false, menuCoords: false, loading: true}
    this.setCoordinates = this.setCoordinates.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  componentDidMount() {
    this._isMounted = true;
    this.setCoordinates()
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
  toggleMenu(coords) {
    this.setState({menu: !this.state.menu, menuCoords: coords})
  }
  async setCoordinates() {
    // If redux store already has coordinates on trail then set component state and set loading to false
    let coordinates
    const matchingTrail = this.props.trails.find(reduxTrail => {
      if (this.props.trail.slug == reduxTrail.slug) return true
    })
    if (matchingTrail.coordinates) {
      if (this._isMounted) this.setState({loading: false, coordinates: matchingTrail.coordinates})
      return
    }
    // If trail does not have json coordinates exit here
    if (
      !this.props.trail.custom_data.jsonCoordinates.url ||
      this.props.trail.custom_data.jsonCoordinates.url === undefined ||
      this.props.trail.custom_data.jsonCoordinates.url === 'undefined'
    ) {
      this.props.updateTrailCoords([], this.props.trail.slug)
      return
    }
    // If trail coordinates are not found in redux store try and get them
    try {
      const coords = await axios.get(`/api/coordinates?url=${this.props.trail.custom_data.jsonCoordinates.url}`)
      this.props.updateTrailCoords(coords.data, this.props.trail.slug)
      if (this._isMounted) this.setState({loading: false, coordinates: coords.data})
    } catch(e) {
      // console.log(e)
    }
  }
  render() {
    // While component is loading
    if (this.state.loading) return null
    // If coordinates loaded then proceed to create variables and render
    const trail = this.props.trail
    const coordinates = this.state.coordinates
    // Change Trail Color Based on the First Value of Recommended Use Array
    let trailColor
    if (trail.custom_data.recommendedUse) {
      switch(trail.custom_data.recommendedUse[0].value) {
        case 'hiking':
          trailColor = '#ed264c'
          break
        case 'biking':
          trailColor = '#ff5a00'
          break
        case 'equestrian':
          trailColor = '#662f8e'
          break
        case 'ohv':
          trailColor = '#00a89c'
          break
        default:
          trailColor = '#ff0000'
      }
    } else {
      trailColor = '#ff0000'
    }
    return (
      <React.Fragment>
        <Paths coordinates={this.state.coordinates} toggleMenu={this.toggleMenu} trailColor={trailColor} slug={trail.slug}  />
        {this.state.menu &&
          <Marker position={this.state.menuCoords} icon={{url: ""}} >
            <InfoWindow options={{'maxWidth' : 320}} onCloseClick={() => this.setState({menu: false})}>
              <div className="info_wrapper">
                <h3 className="top" dangerouslySetInnerHTML={{__html: trail.title.rendered}} />
                <div className="info">
                  {trail.custom_data.length &&
                    <React.Fragment>
                      {this.props.metricType === 'imperial' ?
                        <p>Length: <span>{Number(trail.custom_data.length).toFixed(2)} mi</span></p>
                      :
                        <p>Length: <span>{(Number(trail.custom_data.length) * 1.60934).toFixed(2)} km</span></p>
                      }
                    </React.Fragment>
                  }
                  {trail.custom_data.highlights &&
                    <p>Highlights: {trail.custom_data.highlights.map((highlight, k) => <span key={k}>{highlight.label} </span>)}
                    </p>
                  }
                  {trail.custom_data.trailSurface &&
                    <p>Trail Surface: <span>{trail.custom_data.trailSurface}</span></p>
                  }
                  {trail.custom_data.trailTraffic &&
                    <p>Trail Traffic: <span>{trail.custom_data.trailTraffic.label}</span></p>
                  }
                  {/* REVIEW: Is Difficulty being done correctly here? Also check TrailSidebar.js */}
                  {trail.custom_data.difficulty &&
                    <Difficulty difficulty={trail.custom_data.difficulty} />
                  }
                </div>
                <div className="image">
                  {trail.custom_data.media.pictures[0] &&
                    <img src={trail.custom_data.media.pictures[0].sizes.medium} />
                  }<br />
                  <Link href={`/trails/${trail.slug}`}><a>> View Trail</a></Link>
                </div>
                <div className="icons">
                  {trail.custom_data.recommendedUse &&
                    <div className="trail_type">
                      {trail.custom_data.recommendedUse.some((el) => el.value == 'hiking') &&
                        <img src="/static/images/menu/hiking.svg" alt="Hiking Trail" />
                      }
                      {trail.custom_data.recommendedUse.some((el) => el.value == 'biking') &&
                        <img src="/static/images/menu/biking.svg" alt="Biking Trail" />
                      }
                      {trail.custom_data.recommendedUse.some((el) => el.value == 'equestrian') &&
                        <img src="/static/images/menu/equestrian.svg" alt="Equestrian Trail" />
                      }
                      {trail.custom_data.recommendedUse.some((el) => el.value == 'ohv') &&
                        <img src="/static/images/menu/ohv.svg" alt="OHV Trail" />
                      }
                    </div>
                  }
                </div>
                <style jsx>{`
                  h3 {
                    padding: 0 0 6px;
                    color: #777;
                    border-bottom: 1px solid #ccc;
                  }
                  p {
                    font-weight: bold;
                    margin: 0 0 1rem;
                    color: #777;
                    span {
                      font-weight: normal;
                    }
                    &:last-of-type {
                      margin-bottom: 10px;
                    }
                  }
                  .info_wrapper {
                    display: grid;
                    height: 100%;
                    grid-template-columns: 1fr 1fr;
                    grid-template-rows: 10% 45% 45%;
                    grid-template-areas: "top top" "info info" "image icons";
                    min-width: 300px;
                    width: 100%;
                    .top {
                      grid-area: top;

                    }
                    .info {
                      grid-area: info;
                    }
                    .image {
                      grid-area: image;
                      img {
                        padding: 1.5rem 0;
                        max-width: 140px;
                        height: auto;
                      }
                    }
                    .icons {
                      padding-top: 1rem;
                      grid-area: icons;
                    }
                  }
                  a {
                    text-decoration: none;
                    color: #3fa9f5;
                    font-weight: bold;
                    padding: 3px 0 0;
                    &:hover {
                      text-decoration: none;
                      color: #000;
                    }
                  }
                  .gm-style .gm-style-iw {
                    left: 10px;
                    top: 5px;

                  }
                  .trail_type {
                    display: grid;
                    grid-template: 2.5rem 2.5rem / 2.5rem 2.5rem;
                    align-self: center;
                    img {width: 3.5rem;}
                  }

                `}</style>
              </div>

            </InfoWindow>
          </Marker>
        }
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionTrail)
