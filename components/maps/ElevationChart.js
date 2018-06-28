import axios from 'axios'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'

class ElevationChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loading: true}
    this.fetchData = this.fetchData.bind(this)
    this.renderTooltip = this.renderTooltip.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
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
  renderTooltip(data) {
    const elevation = data.payload && data.payload[0] ? Number(data.payload[0].payload.elevation).toFixed(0) : false
    if (!elevation) return null
    return (
      <div>
        <p>Elevation <span>{elevation}</span></p>
        <style jsx>{`
          div {
            background: #fff;
            padding: 0.5rem 1.5rem;
          }
          p {
            span {
              font-weight: 100;
            }
          }
        `}</style>
      </div>
    )
  }
  mouseMove(data) {
    const marker = data.activePayload ? data.activePayload[0].payload.location : false
    this.props.pathMarker(marker)
  }
  render() {
    if (this.state.loading) return null
    const totalDistance = Number(this.props.trail.custom_data.length).toFixed(2)
    const maxElevation = Number(Math.max(...this.state.elevations.map(o => o.elevation)) ).toFixed(0)
    const minElevation = Number(Math.min(...this.state.elevations.map(o => o.elevation)) ).toFixed(0)
    return (
      <div>
        <h2>Elevation</h2>
        <div className="chart">
          <AreaChart width={820} height={250} data={this.state.elevations} onMouseMove={this.mouseMove}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <YAxis/>
            <Tooltip content={this.renderTooltip} />
            <Area type='monotone' dataKey='elevation' stroke='#0967aa' fill='#3fa9f5' />
          </AreaChart>
        </div>
        <div className="details">
          <div className="stats">
            <p>Total Distance<span>{totalDistance}</span></p>
            <p>Max Elevation<span>{maxElevation}</span></p>
            <p>Min Elevation<span>{minElevation}</span></p>
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
            padding: 1.5rem 0;
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
                padding-left: 1rem;
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
