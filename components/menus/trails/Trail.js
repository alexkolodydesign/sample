import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import sanitizeHtml from 'sanitize-html-react';
// import debounce from 'lodash.debounce';
import { trailShape } from '../../../utils/propTypes';
import TrailLink from './Trail.styles';
// highlightTrail
const Trail = ({ trail, metricType }) => (
  <>
    <Link href="/trails/trail" as={`/trails/${trail.slug}`}>
      <TrailLink
        // This trail highlight feature is pretty costly, slows down the user experience
        // Could debounced this to only activate at maximum once per 2.5 seconds but still bad
        // onMouseEnter={debounce(() => highlightTrail(trail.slug), 2500)}
        href="/trails/trail"
      >
        <div
          style={{
            backgroundImage: `url(${
              trail.custom_data.media.pictures[0]
                ? trail.custom_data.media.pictures[0].sizes.medium
                : '/static/images/washco-logo-color.png'
            })`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
        <div className="details">
          <h4>{ReactHtmlParser(sanitizeHtml(trail.title.rendered))}</h4>
          <p>
            {metricType === 'imperial' ? (
              <span>{Number(trail.custom_data.length).toFixed(2)} mi</span>
            ) : (
              <span>{(trail.custom_data.length * 1.60934).toFixed(2)} km</span>
            )}
          </p>
          {trail.custom_data.highlights && (
            <p>
              Highlights:
              {trail.custom_data.highlights.map((highlight, index, k) => {
                if (index < trail.custom_data.highlights.length - 1) {
                  return <span key={k}> {highlight.label},</span>;
                }
                return <span key={k}> {highlight.label}</span>;
              })}
            </p>
          )}
          {trail.custom_data.difficulty.defaultDifficulty.value && (
            <p>
              <span>{trail.custom_data.difficulty.defaultDifficulty.label}</span>
            </p>
          )}
          {trail.custom_data.region && (
            <p>
              <span>{trail.custom_data.region} Region</span>
            </p>
          )}
        </div>
        <div className="trail_type">
          <img
            src="/static/images/menu/hiking.svg"
            alt="Select Hiking Trails"
            className={
              trail.custom_data.trailType.length > 0 &&
              trail.custom_data.trailType.some(el => el.value === 'hiking')
                ? 'active'
                : 'inactive'
            }
          />
          <img
            src="/static/images/menu/biking.svg"
            alt="Select Biking Trails"
            className={
              trail.custom_data.trailType.length > 0 &&
              trail.custom_data.trailType.some(el => el.value === 'biking')
                ? 'active'
                : 'inactive'
            }
          />
          <img
            src="/static/images/menu/equestrian.svg"
            alt="Select Equestrian Trails"
            className={
              trail.custom_data.trailType.length > 0 &&
              trail.custom_data.trailType.some(el => el.value === 'equestrian')
                ? 'active'
                : 'inactive'
            }
          />
          <img
            src="/static/images/menu/ohv.svg"
            alt="Select OHV Trails"
            className={
              trail.custom_data.trailType.length > 0 &&
              trail.custom_data.trailType.some(el => el.value === 'ohv')
                ? 'active'
                : 'inactive'
            }
          />
        </div>
      </TrailLink>
    </Link>
  </>
);

Trail.propTypes = {
  trail: trailShape.isRequired,
  // highlightTrail: PropTypes.func.isRequired,
  metricType: PropTypes.string.isRequired
};

// Redux
const mapStateToProps = state => ({ metricType: state.map.metricType });
const mapDispatchToProps = dispatch => ({
  highlightTrail: slug => dispatch({ type: 'HIGHLIGHT_TRAIL', slug })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trail);
