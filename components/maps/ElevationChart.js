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
    // TODO: move data to state
    this.state = { loading: true }
    this.renderTooltip = this.renderTooltip.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }
  static getDerivedStateFromProps(props, state) {
    return state
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props === nextProps) return false
    else return true
  }
  updateWindowDimensions() {
    let width
    if (window.innerWidth <= 768) width = 400;
    else width = 900;
    this.setState({ loading: false, width })
  }
  renderTooltip(data) {
    const elevation = data.payload && data.payload[0] ? Number(data.payload[0].payload.elevation).toFixed(0) : false
    if (!elevation) return null
    return (
      <div className="custom-tooltip">
        {this.props.metricType === 'imperial' ?
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
    const coordinates = Array.isArray(this.props.coordinates[0]) ?
      [].concat.apply([], this.props.coordinates)
      : this.props.coordinates
    const maxElevation = this.props.metricType === 'imperial' ?
      Number(Math.max(...coordinates.map(o => o.elevation)) ).toFixed(0)
    :
      Number(Math.max(...coordinates.map(o => (o.elevation * 0.3048))) ).toFixed(0)
    const minElevation = this.props.metricType === 'imperial' ?
      Number(Math.min(...coordinates.map(o => o.elevation)) ).toFixed(0)
    :
      Number(Math.min(...coordinates.map(o => (o.elevation * 0.3048))) ).toFixed(0)
    const diff = Math.floor(Math.abs(maxElevation - minElevation))
    const data = coordinates.map(coordinate => {
      if (this.props.metricType === 'imperial') coordinate.elevation = Math.floor(coordinate.elevation)
      else coordinate.elevation = Math.floor((coordinate.elevation * 0.3048))
      return coordinate
    })
    const elevationFlag = coordinates.some((el) => el.elevation)
    return (
      <ErrorBoundary>
        <div>
          <div>
            <h2>Elevation</h2>
            <div className="chart">
              {!this.state.loading &&
                <Chart
                  width={Number(this.state.width)}
                  data={data}
                  onMouseMove={this.mouseMove}
                  domain={[(Math.round(minElevation/10)*10)-2, (Math.ceil(maxElevation/10)*10)+2]}
                  metricType={this.props.metricType}
                  renderTooltip={this.renderTooltip}
                  areaStrokeColor={this.props.areaStrokeColor}
                />
              }
            </div>
          </div>
          <div className="details">
            <div className="stats">
              {this.props.metricType === 'imperial' ?
                <p>Total Distance<span>{totalDistance} miles</span></p>
              :
                <p>Total Distance<span>{(totalDistance * 1.60934).toFixed(2)} km</span></p>
              }
              <div>
                {this.props.metricType === 'imperial' ?
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

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.width !== this.props.width ||
      nextProps.metricType !== this.props.metricType
    ) { return true }
    else { return false }
  }
  render() {
    return (
      <AreaChart width={this.props.width} height={250} data={this.props.data} onMouseMove={this.props.onMouseMove} margin={{top: 10, right: 20, left: 10, bottom: 20}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <YAxis
          allowDecimals={false}
          unit={this.props.metricType === 'imperial' ? " ft" : " meters"}
          interval='preserveEnd'
          //ticks={[(Math.round(minElevation/10)*10)-2, (Math.ceil(maxElevation/10)*10)+2]}
          domain={this.props.domain}
        />
        <Tooltip content={this.props.renderTooltip} />
        <Area type='monotone' dataKey='elevation' stroke={this.props.areaStrokeColor} strokeWidth={2} fill='rgba(197,196,188,0.8)' />
      </AreaChart>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ElevationChart)
