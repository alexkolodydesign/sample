import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import sanitizeHtml from 'sanitize-html-react';
import { connect } from 'react-redux';
import Difficulty from '../maps/Difficulty';
import { trailShape } from '../../utils/propTypes';

const TrailSidebar = ({ trail: { custom_data: trail, content }, metricType }) => {
  const hasdifficulty = Object.values(trail.difficulty).some(
    difficulty => difficulty.value !== 'none'
  );
  return (
    <div className="sidebar">
      <div className="details background">
        {trail.region && (
          <div>
            <p>
              Region
              <br />
              <span>{trail.region}</span>
            </p>
          </div>
        )}

        {hasdifficulty && (
          <div>
            <Difficulty difficulty={trail.difficulty} />
            <br />
          </div>
        )}

        {trail.length && (
          <>
            {metricType === 'imperial' ? (
              <div>
                <p>
                  Length
                  <br />
                  <span>{trail.length} mi</span>
                </p>
              </div>
            ) : (
              <div>
                <p>
                  Length
                  <br />
                  <span>{(trail.length * 1.60934).toFixed(2)} km</span>
                </p>
              </div>
            )}
          </>
        )}

        {trail.trailTraffic && (
          <div>
            <p>
              Trail Traffic
              <br />
              <span>{trail.trailTraffic.label}</span>
            </p>
          </div>
        )}

        {trail.entranceFee && (
          <div>
            <p>
              Entrance Fee
              <br />
              <span>{trail.entranceFee}</span>
            </p>
          </div>
        )}

        {trail.routeType && (
          <div>
            <p>
              Route Type
              <br />
              <span>{trail.routeType.label}</span>
            </p>
          </div>
        )}

        {trail.highlights && (
          <div>
            <p>
              Highlights
              <br />
              {trail.highlights.map(highlight => (
                <span key={highlight.value}>
                  {highlight.label}
                  <br />
                </span>
              ))}
            </p>
          </div>
        )}

        {trail.trailSurface && (
          <div>
            <p>
              Trail Surface
              <br />
              <span>{trail.trailSurface}</span>
            </p>
          </div>
        )}

        {trail.accessibility && (
          <div className="accessibility">
            <p>
              Accessibility
              <br />
              {trail.accessibility &&
                trail.accessibility.map(thing => (
                  <span key={thing.value}>
                    {thing.label} <br />
                  </span>
                ))}
            </p>
          </div>
        )}

        {trail.suitability && (
          <div className="suitability">
            <p>
              Suitability
              <br />
              {trail.suitability &&
                trail.suitability.map(thing => (
                  <span key={thing.value}>{thing.label} </span>
                ))}
            </p>
          </div>
        )}

        {trail.recommendedUse && (
          <div>
            <p>
              Recommended Use
              <br />
              <span>
                {trail.recommendedUse.map(use => (
                  <span key={use.value}>
                    <img
                      className="use-icon"
                      src={`/static/images/menu/${use.value}.svg`}
                      alt={use.label}
                    />
                    {use.label} <br />
                  </span>
                ))}
              </span>
            </p>
          </div>
        )}

        {trail.directions && (
          <div className="trail_directions">
            <p>Directions</p>
            <div className="description">
              {ReactHtmlParser(sanitizeHtml(trail.directions))}
            </div>
          </div>
        )}

        {content && content.rendered && (
          <div className="trail_description">
            <p>Description</p>
            <div className="description">
              {ReactHtmlParser(sanitizeHtml(content.rendered))}
            </div>
          </div>
        )}

        {trail.icons && (
          <div className="trail-general-icons">
            {trail.icons.map(icon => (
              <img
                key={icon.value}
                src={`/static/images/trail/black-icons/${icon.value}-icon-black.svg`}
                alt={icon.label}
              />
            ))}
          </div>
        )}
      </div>
      <style jsx>
        {`
          @media screen {
            .background {
              background: #fff;
              background-image: linear-gradient(
                  rgba(255, 255, 255, 0.98),
                  rgba(255, 255, 255, 0.98)
                ),
                url(/static/images/background-pattern.svg);
              background-position: center;
              background-size: 29rem auto;
              &.details {
                padding: 1rem;
                display: grid;
                grid-template-columns: 1fr 1fr;

                .trail_description {
                  grid-column-start: 1;
                  grid-column-end: 3;
                }

                p {
                  margin: 0 0 2rem 0;
                  text-transform: uppercase;
                  font-weight: 500;
                  span {
                    font-weight: 100;
                    text-transform: initial;
                  }
                }
              }
            }
            .trail_description,
            .trail_directions {
              grid-column-start: 1;
              grid-column-end: 3;

              .description {
                font-weight: 100;
              }
            }
            .use-icon {
              max-width: 30px;
              display: inline-block;
              vertical-align: middle;
              margin-right: 10px;
            }
            .buttons {
              margin-top: 3rem;
            }
            button {
              border: none;
              width: 100%;
              margin-bottom: 1.5rem;
              padding: 1.5rem 3rem;
              color: #fff;
              font-size: 1.8rem;
              cursor: pointer;
              transition: all 500ms;
              background: #4d4e4e;
              &:hover {
                background: #262727;
              }
              &:first-child {
                background: #3fa9f5;
                &:hover {
                  background: #0d93f2;
                }
              }
            }
            .trail-general-icons {
              img {
                max-width: 40px;
                display: inline-block;
                margin-right: 5px;
              }
            }
          }
          @media screen and (min-width: 768px) {
            .background {
              &.details {
                display: block;
              }
            }
          }
          @media screen and (min-width: 992px) {
            .background {
              &.details {
                padding: 3rem;
              }
            }
          }

          @media print {
            .sidebar {
              width: 30%;
              float: left;
            }
            img {
              display: none;
            }
            *,
            *:before,
            *:after {
              background: #ffffff;
            }
            /*
          *, *:before, *:after {
            display: none;
          }
          */
          }
        `}
      </style>
    </div>
  );
};

TrailSidebar.propTypes = {
  metricType: PropTypes.string.isRequired,
  trail: trailShape.isRequired
};

// Redux
const mapStateToProps = state => ({
  metricType: state.map.metricType
});

export default connect(
  mapStateToProps,
  null
)(TrailSidebar);
