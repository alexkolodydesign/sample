import axios from 'axios'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import ErrorBoundary from '../ErrorBoundary'

export default class ElevationChart extends React.Component {
  constructor(props) {
    super(props)
    this.renderTooltip = this.renderTooltip.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
    if (window.innerWidth <= 768) {
      this.state = { width: window.innerWidth - 120, height: window.innerHeight };
    }
    else if (window.innerWidth < 1200) {
      this.state = { width: window.innerWidth-420, height: window.innerHeight };
    }
    else {
      this.state = { width: window.innerWidth, height: window.innerHeight };
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state === nextState) return false
    else return true
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {

    if (window.innerWidth <= 768) {
      this.setState({ width: window.innerWidth - 120, height: window.innerHeight });
    }
    else if (window.innerWidth < 1200) {
      this.setState({ width: window.innerWidth-420, height: window.innerHeight });
    }
    else {
      this.setState({ width: 820, height: window.innerHeight });
    }

  }
  renderTooltip(data) {
    const elevation = data.payload && data.payload[0] ? Number(data.payload[0].payload.elevation).toFixed(0) : false
    if (!elevation) return null
    return (
      <div className="custom-tooltip">
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
    if (!data.activePayload) return
    const marker = data.activePayload[0].payload
    this.props.pathMarker(marker)
  }
  render() {
    const totalDistance = Number(this.props.trail.custom_data.length).toFixed(2)
    const trailType = this.props.trail.custom_data.trailType
    const diff = Math.floor(Math.abs(maxElevation - minElevation))
    const coordinates = Array.isArray(this.props.coordinates[0]) ?
      [].concat.apply([], this.props.coordinates)
      : this.props.coordinates
    const maxElevation = Number(Math.max(...coordinates.map(o => o.elevation)) ).toFixed(0)
    const minElevation = Number(Math.min(...coordinates.map(o => o.elevation)) ).toFixed(0)
    const elevationFlag = coordinates.some((el) => el.elevation)

    return (
      <ErrorBoundary>
        <div>
          {elevationFlag &&
            <div>
              <h2>Elevation</h2>
              <div className="chart">
                <AreaChart width={this.state.width} height={250} data={coordinates.map(coordinate => {
                  coordinate.elevation = Math.floor(coordinate.elevation)
                  return coordinate
                })} onMouseMove={this.mouseMove}
                  margin={{top: 10, right: 20, left: 10, bottom: 20}}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <YAxis
                    allowDecimals={false}
                    unit=" ft"
                    interval='preserveEnd'
                    //ticks={[(Math.round(minElevation/10)*10)-2, (Math.ceil(maxElevation/10)*10)+2]}
                    domain={[(Math.round(minElevation/10)*10)-2, (Math.ceil(maxElevation/10)*10)+2]}
                  />
                  <Tooltip content={this.renderTooltip} />
                  <Area type='monotone' dataKey='elevation' stroke={this.props.areaStrokeColor} strokeWidth={2} fill='rgba(197,196,188,0.8)' />
                </AreaChart>
              </div>
            </div>
          }
          <div className="details">
            <div className="stats">
              <p>Total Distance<span>{totalDistance} miles</span></p>
              {elevationFlag &&
                <div>
                  <p>Max Elevation<span>{maxElevation}</span></p>
                  <p>Min Elevation<span>{minElevation}</span></p>
                </div>
              }
            </div>
            <div className="map_type">
              {trailType &&
                  trailType.map( (type, k) => <img key={k} className='type-icon' src={`/static/images/menu/${type.value}.svg`} alt={type.label} />  )
              }
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
              grid-template-columns: 1fr 11rem;
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
            .recharts-surface {
              overflow-y: visible;
            }
            @media screen and (min-width: 768px) {
              .details {
                display: grid;
                grid-template-columns: 1fr 15rem;
                margin-top: 3rem;
              }
            }
            @media print {
              .details {
                display: none;
              }
            }
          `}</style>
        </div>
      </ErrorBoundary>
    )
  }
}
