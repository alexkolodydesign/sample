import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Chart from './Chart';
import ErrorBoundary from './ErrorBoundary';
import { trailShape, trailCoordinatesShape } from '../../utils/propTypes';

class ElevationChart extends React.Component {
  state = {};

  shouldComponentUpdate = nextprops => {
    console.log(this.props);
    const { trail, metricType } = this.props;
    if (trail.slug !== nextprops.trail.slug) return true;
    if (metricType !== nextprops.metricType) return true;
    return false;
  };

  renderTooltip = data => {
    const { metricType } = this.props;
    const elevation =
      data.payload && data.payload[0]
        ? Number(data.payload[0].payload.elevation).toFixed(0)
        : false;
    if (!elevation) return null;
    return (
      <div className="custom-tooltip">
        {metricType === 'imperial' ? (
          <p>
            Elevation <span>{elevation} ft</span>
          </p>
        ) : (
          <p>
            Elevation <span>{(elevation * 0.3048).toFixed(2)} meters</span>
          </p>
        )}
        <style jsx>
          {`
            div {
              background: #fff;
              padding: 0.5rem 1.5rem;
            }

            p {
              span {
                font-weight: 100;
              }
            }
          `}
        </style>
      </div>
    );
  };

  mouseMove = data => {
    const { pathMarker } = this.props;
    if (!data.activePayload) return;
    const marker = data.activePayload[0].payload;
    pathMarker(marker);
  };

  render() {
    const { trail, coordinates, metricType, areaStrokeColor } = this.props;
    const { width } = this.state;
    const totalDistance = Number(trail.custom_data.length).toFixed(2);
    const { trailType } = trail.custom_data;
    const maxElevation =
      metricType === 'imperial'
        ? Number(Math.max(...coordinates.map(o => o.elevation))).toFixed(0)
        : Number(Math.max(...coordinates.map(o => o.elevation * 0.3048))).toFixed(0);
    const minElevation =
      metricType === 'imperial'
        ? Number(Math.min(...coordinates.map(o => o.elevation))).toFixed(0)
        : Number(Math.min(...coordinates.map(o => o.elevation * 0.3048))).toFixed(0);
    const data = coordinates.map(coordinate => {
      const elevation = Math.floor(coordinate.elevation);
      const elevationMetric = Math.floor(coordinate.elevation * 0.3048);
      return { ...coordinate, elevation, elevationMetric };
    });
    return (
      <ErrorBoundary>
        <div>
          <div>
            <h2>Elevation</h2>
            <div className="chart">
              <Chart
                width={Number(width)}
                data={data}
                onMouseMove={this.mouseMove}
                maxElevation={maxElevation}
                minElevation={minElevation}
                metricType={metricType}
                renderTooltip={this.renderTooltip}
                areaStrokeColor={areaStrokeColor}
              />
            </div>
          </div>
          <div className="details">
            <div className="stats">
              {metricType === 'imperial' ? (
                <p>
                  Total Distance<span>{totalDistance} miles</span>
                </p>
              ) : (
                <p>
                  Total Distance<span>{(totalDistance * 1.60934).toFixed(2)} km</span>
                </p>
              )}
              <div>
                {metricType === 'imperial' ? (
                  <>
                    <p>
                      Max Elevation<span>{maxElevation} ft</span>
                    </p>
                    <p>
                      Min Elevation<span>{minElevation} ft</span>
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Max Elevation<span>{maxElevation} meters</span>
                    </p>
                    <p>
                      Min Elevation<span>{minElevation} meters</span>
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="map_type">
              {trailType &&
                trailType.map(type => (
                  <img
                    key={type.value}
                    className="type-icon"
                    src={`/static/images/menu/${type.value}.svg`}
                    alt={type.label}
                  />
                ))}
            </div>
          </div>
          <style jsx>
            {`
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
                .chart {
                  background: #ffffff;
                }
              }
            `}
          </style>
        </div>
      </ErrorBoundary>
    );
  }
}

ElevationChart.propTypes = {
  trail: trailShape.isRequired,
  coordinates: trailCoordinatesShape.isRequired,
  metricType: PropTypes.string.isRequired,
  areaStrokeColor: PropTypes.string.isRequired,
  pathMarker: PropTypes.func.isRequired
};

// Redux
const mapStateToProps = state => ({
  metricType: state.map.metricType
});

export default connect(
  mapStateToProps,
  null
)(ElevationChart);
