import axios from 'axios'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import ErrorBoundary from '../ErrorBoundary'

export default class ElevationChart extends React.Component {
  constructor(props) {
    super(props)
    this.renderTooltip = this.renderTooltip.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state === nextState) return false
    else return true
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
    const maxElevation = Number(Math.max(...this.props.coordinates.map(o => o.elevation)) ).toFixed(0)
    const minElevation = Number(Math.min(...this.props.coordinates.map(o => o.elevation)) ).toFixed(0)
    const diff = Math.floor(Math.abs(maxElevation - minElevation))
    const elevationFlag = this.props.coordinates.some((el) => el.value == 'elevation')

    return (
      <ErrorBoundary>
        <div>
          {elevationFlag &&
            <div>
              <h2>Elevation</h2>
              <div className="chart">

                <AreaChart width={820} height={250} data={this.props.coordinates} onMouseMove={this.mouseMove}
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
              <img src="/static/images/menu/hiking.svg" alt="Select Hiking Trails" />
              <img src="/static/images/menu/biking.svg" alt="Select Biking Trails" />
              <img src="/static/images/menu/equestrian.svg" alt="Select Equestian Trails" />
              <img src="/static/images/menu/ohv.svg" alt="Select OHV Trails" />
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
            .recharts-surface {
              overflow-y: visible;
            }
          `}</style>
        </div>
      </ErrorBoundary>
    )
  }
}
