import { InfoWindow, Marker } from "react-google-maps"
import Link from 'next/link'
import { getCoordinates } from '../../redux/mapActions'
import Paths from './Paths'
import Difficulty from './Difficulty'

class RegionTrail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { coordinates: [], menu: false, menuCoords: false}
    this.setCoordinates = this.setCoordinates.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  toggleMenu(coords) {
    this.setState({menu: !this.state.menu, menuCoords: coords})
  }
  async setCoordinates() {
    const coords = await getCoordinates(this.props.trail.custom_data.jsonCoordinates, this.props.trail.slug)
    if (coords) this.setState({coordinates: coords})
  }
  render() {
    const trail = this.props.trail
    let coordinates
    // Zoom threshold is not great enough for trail to show
    if (this.props.zoomLevel < trail.custom_data.zoomThreshold) {
      return null
    } else {
      // Check localstorage for data before sending fetch
      const trailStorage = localStorage.getItem('trails')
      // No session storage so send fetch
      if (!trailStorage) {
        if (!this.state.coordinates || this.state.coordinates === undefined || this.state.coordinates.length == 0) {
          this.setCoordinates()
          return null
        }
      } else {
        // Check if session storage has this trail in it
        const trailStorageJSON = JSON.parse(trailStorage)
        const match = trailStorageJSON.find(storedTrail => trail.slug === storedTrail.slug)
        if (match != undefined) {
          coordinates = match.coordinates ? match.coordinates : []
        }
        else {
          this.setCoordinates()
          return null
        }
      }
    }
    if (!coordinates) {
      coordinates = this.state.coordinates
    }
    // Change Trail Color Based on the First Value of Recommended Use Array
    let trailColor
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
    return (
      <React.Fragment>
        <Paths coordinates={coordinates} toggleMenu={this.toggleMenu} trailColor={trailColor} slug={trail.slug}  />

        {this.state.menu &&
          <Marker position={this.state.menuCoords} icon={{url: ""}} >
            <InfoWindow options={{'maxWidth' : 320}} onCloseClick={() => this.setState({menu: false})}>
              <div className="info_wrapper">
                <h3 className="top" dangerouslySetInnerHTML={{__html: trail.title.rendered}} />
                <div className="info">
                  {trail.custom_data.length &&
                    <p>Length: <span>{Number(trail.custom_data.length).toFixed(2)} miles</span></p>
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

export default RegionTrail
