import { Polyline, InfoWindow, Marker } from "react-google-maps"
import axios from 'axios'
import Link from 'next/link'

export default class RegionTrail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { coordinates: [], menu: false}
    this.setCoordinates = this.setCoordinates.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  toggleMenu() {
    this.setState({menu: !this.state.menu})
  }
  async setCoordinates() {
    if (!this.props.trail.custom_data.jsonCoordinates) return null
    try {
      const {data: { trail }} = await axios.get('/api/coordinates', {params: {url: encodeURI(this.props.trail.custom_data.jsonCoordinates)} } )
      // Store this data so we don't make extra calls when zooming
      const trailStorage = localStorage.getItem('trails')
      if (!trailStorage) {
        localStorage.setItem('trails', JSON.stringify([{
          slug: this.props.trail.slug,
          coordinates: trail.coordinates
        }]))
      } else {
        const trailStorageJSON = JSON.parse(trailStorage)
        trailStorageJSON.push({
          slug: this.props.trail.slug,
          coordinates: trail.coordinates
        })
        localStorage.removeItem('trails')
        localStorage.setItem('trails', JSON.stringify(trailStorageJSON))
      }
      this.setState({coordinates: trail.coordinates})
    } catch(e) {
      console.log("Issue with Url: ", e)
    }
  }
  render() {
    const trail = this.props.trail
    let coordinates
    // Zoom threshold is not great enough for trail to show
    if (this.props.zoomLevel < 10) {
      return null
    } else {
      // Check localstorage for data before sending fetch
      const trailStorage = localStorage.getItem('trails')
      // No localstorage so send fetch
      if (!trailStorage) {
        if (this.state.coordinates === undefined || this.state.coordinates.length == 0) {
          this.setCoordinates()
          return null
        }
      } else {
        // Check if localstorage has this trail in it
        const trailStorageJSON = JSON.parse(trailStorage)
        const match = trailStorageJSON.find(storedTrail => trail.slug === storedTrail.slug)
        if (match != undefined) coordinates = match.coordinates ? match.coordinates.map(point => ({lat: Number(point.lat), lng: Number(point.lng)})) : []
        else {
          this.setCoordinates()
          return null
        }
      }
    }
    if (!coordinates) coordinates = this.state.coordinates.map(point => ({lat: Number(point.lat), lng: Number(point.lng)}))
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
        <Polyline
          path={coordinates}
          options={{
            strokeColor: trailColor,
            strokeOpacity:1,
            strokeWeight:3,
          }}
          onClick={this.toggleMenu}
        />
        {this.state.menu &&
          <Marker position={{lat: coordinates[0].lat, lng: coordinates[0].lng}} icon={{url: ""}} >
            <InfoWindow options={{'maxWidth' : 320}} onCloseClick={() => this.setState({menu: false})}>
              <div className="info_wrapper">
                <div className="left">
                  <h3>{trail.title.rendered}</h3>
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
                  {trail.custom_data.difficulty && trail.custom_data.difficulty.defaultDifficulty &&
                    <p>Difficulty: <span>{trail.custom_data.difficulty.defaultDifficulty.label}</span></p>
                  }
                  {trail.custom_data.media.pictures[0] &&
                    <img src={trail.custom_data.media.pictures[0].sizes.medium} />
                  }
                  <br />
                  <Link href={`/trails/${trail.slug}`}><a>> View Trail</a></Link>
                </div>
                { /* <div className="right">
                  {trail.custom_data.region &&
                    <p>Region: <span>{trail.custom_data.region}</span></p>
                  }
                </div> */ }
                <style jsx>{`
                  h3 {
                    padding: 0 0 6px;
                    margin: 0 0 3px;
                    border-bottom: 1px solid #222222;
                  }
                  p {
                    font-weight: bold;
                    margin: 2px 0;
                    span {
                      font-weight: normal;
                    }
                    &:last-of-type {
                      margin-bottom: 10px;
                    }
                  }
                  .info_wrapper {
                    display: flex;
                    .left {
                      flex: 1;
                      flex-grow: 2;
                      img {
                        max-height: 150px;
                        width: auto;
                      }
                    }
                    .right {
                      flex: 1;
                      flex-grow: 1;
                    }
                  }
                  a {
                    text-decoration: none;
                    color: #3fa9f5;
                    font-weight: bold;
                    padding: 3px 0;
                    &:hover {
                      text-decoration: none;
                      color: #000;
                    }
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
