import axios from 'axios'

class ElevationChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loading: true}
    this.fetchData = this.fetchData.bind(this)
  }
  async fetchData() {
    const {data: {elevations}} = await axios.get(
      '/api/elevation',
      {
        params: {
          locations: this.props.coordinates.map(point => `${Number(point.lat)},${Number(point.lng)}|`).toString(),
        }
      }
    )
    this.setState({
      loading: false,
      elevations: elevations
    })
  }
  componentDidMount() {
    this.fetchData()
  }
  render() {
    if (this.state.loading) return null
    const totalDistance = this.props.trail.custom_data.length
    const maxElevation = Math.max(...this.state.elevations.map(o => o.elevation));
    const minElevation = Math.min(...this.state.elevations.map(o => o.elevation));
    return (
      <div>
        <h2>Elevation</h2>
        <div className="chart"></div>
        <div className="details">
          <div className="stats">
            <p>Total Distance: <span>{totalDistance}</span></p>
            <p>Max Elevation: <span>{maxElevation}</span></p>
            <p>Min Elevation: <span>{minElevation}</span></p>
          </div>
          <div className="map_type">
            <img src="/static/images/menu/hiking.svg" alt="Select Hiking Trails" />
            <img src="/static/images/menu/biking.svg" alt="Select Biking Trails" />
            <img src="/static/images/menu/horse.svg" alt="Select Horseback Trails" />
            <img src="/static/images/menu/atv.svg" alt="Select ATV Trails" />
          </div>
        </div>
        <style jsx>{`
          h2 {
            margin: 3rem 0rem 1.5rem 0rem;
          }
          .chart {
            background: #eee;
            height: 15rem;
            width: 100%;
          }
          .details {
            display: grid;
            grid-template-columns: 1fr 15rem;
            margin-top: 3rem;
          }
          .stats {
            p {
              font-weight: 700;
              span {
                font-weight: 100;
              }
            }
          }
          .map_type {
            display: grid;
            grid-template: repeat(2, 6rem) / repeat(2, 6rem);
            img {
              width: 5rem;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default ElevationChart
