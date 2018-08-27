import axios from 'axios'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import { connect } from 'react-redux'
import ErrorBoundary from '../ErrorBoundary'

// Redux
const mapStateToProps = (state, ownProps) => {
  return {
    metricType: state.map.metricType,
    ...ownProps
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

class ElevationChart extends React.Component {
  constructor(props) {
    super(props)
    this.renderTooltip = this.renderTooltip.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    if (window.innerWidth <= 768) this.state = { width: window.innerWidth - 120, height: window.innerHeight, metricType: this.props.metricType, };
    else if (window.innerWidth < 1200) this.state = { width: window.innerWidth-420, height: window.innerHeight, metricType: this.props.metricType, };
    else this.state = { width: window.innerWidth, height: window.innerHeight, metricType: this.props.metricType };
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log({nextProps, nextState})
    if (nextProps === nextState) {
      console.log("SAME TYPE")
      return false
    }
    if (nextProps.metricType !== nextState.metricType) {
      console.log("NOT THE SAME TYPE")
      return true
    }
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
    if (window.innerWidth <= 768) this.setState({ width: window.innerWidth - 120, height: window.innerHeight });
    else if (window.innerWidth < 1200) this.setState({ width: window.innerWidth-420, height: window.innerHeight });
    else this.setState({ width: 820, height: window.innerHeight });
  }
  renderTooltip(data) {
    const elevation = data.payload && data.payload[0] ? Number(data.payload[0].payload.elevation).toFixed(0) : false
    if (!elevation) return null
    return (
      <div className="custom-tooltip">
        {this.state.metricType === 'imperial' ?
          <p>Elevation <span>{elevation} ft</span></p>
        :
          <p>Elevation <span>{(elevation * 0.3048).toFixed(2)} meters</span></p>
        }
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
    const maxElevation = this.state.metricType === 'imperial' ?
      Number(Math.max(...coordinates.map(o => o.elevation)) ).toFixed(0)
    :
      Number(Math.max(...coordinates.map(o => (o.elevation * 0.3048))) ).toFixed(0)
    const minElevation = this.state.metricType === 'imperial' ?
      Number(Math.min(...coordinates.map(o => o.elevation)) ).toFixed(0)
    :
      Number(Math.min(...coordinates.map(o => (o.elevation * 0.3048))) ).toFixed(0)
    const elevationFlag = coordinates.some((el) => el.elevation)

    return (
      <ErrorBoundary>
        <div>
          {elevationFlag &&
            <div>
              <h2>Elevation</h2>
              <div className="chart">
                <AreaChart width={this.state.width} height={250} data={
                  coordinates.map(coordinate => {
                    if (this.state.metricType === 'imperial') coordinate.elevation = Math.floor(coordinate.elevation)
                    else coordinate.elevation = Math.floor((coordinate.elevation * 0.3048))
                    return coordinate
                  })
                } onMouseMove={this.mouseMove}
                  margin={{top: 10, right: 20, left: 10, bottom: 20}}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <YAxis
                    allowDecimals={false}
                    unit={this.state.metricType === 'imperial' ? " ft" : " meters"}
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
              {this.props.metricType === 'imperial' ?
                <p>Total Distance<span>{totalDistance} miles</span></p>
              :
                <p>Total Distance<span>{(totalDistance * 1.60934).toFixed(2)} km</span></p>
              }
              {elevationFlag &&
                <div>
                  {this.state.metricType === 'imperial' ?
                    <React.Fragment>
                      <p>Max Elevation<span>{maxElevation} ft</span></p>
                      <p>Min Elevation<span>{minElevation} ft</span></p>
                    </React.Fragment>
                  :
                    <React.Fragment>
                      <p>Max Elevation<span>{maxElevation} meters</span></p>
                      <p>Min Elevation<span>{minElevation} meters</span></p>
                    </React.Fragment>
                  }
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

export default connect(mapStateToProps, mapDispatchToProps)(ElevationChart)
