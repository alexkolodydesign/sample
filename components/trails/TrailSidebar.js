import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import sanitizeHtml from 'sanitize-html-react';
import { connect } from 'react-redux';
import Difficulty from '../shared/Difficulty';
import { trailShape } from '../../utils/propTypes';
import TrailSidebarStyles from './TrailSidebar.styles';

const TrailSidebar = ({ trail: { custom_data: trail, content }, metricType }) => {
  const hasdifficulty = Object.values(trail.difficulty).some(
    difficulty => difficulty.value !== 'none'
  );
  const trail_label = trail.alternate_traffic_label
    ? trail.alternate_traffic_label
    : 'Trail Traffic';

  return (
    <TrailSidebarStyles>
      <div className="details trail_sidebar box_shadow">
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
          </div>
        )}

        {trail.length && (
          <>
            {metricType === 'imperial' ? (
              <div>
                <p>
                  Length
                  <br />
                  <span>{Number(trail.length).toFixed(2)} mi</span>
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
              {trail_label}
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
              {trail.recommendedUse.map(use => (
                <span className="recommended_use_detail" key={use.value}>
                  <img
                    className="use-icon"
                    src={`/static/images/menu/${use.value}.svg`}
                    alt={use.label}
                  />
                  <span>{use.label}</span>
                </span>
              ))}
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
    </TrailSidebarStyles>
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
