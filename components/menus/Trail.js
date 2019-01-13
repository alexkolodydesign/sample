import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { trailShape } from '../../utils/propTypes';

const Trail = ({ trail, highlightTrail, metricType }) => (
  <>
    <Link href="/trails/trail" as={`/trails/${trail.slug}`}>
      <a
        className="trail"
        // This trail highlight feature is pretty costly, slows down the user experience
        // Currently debounced this to only active at maximum once per 2.5 seconds
        onMouseEnter={debounce(() => highlightTrail(trail.slug), 2500)}
        href="/trails/trail"
        as={`/trails/${trail.slug}`}
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
          <h4 dangerouslySetInnerHTML={{ __html: trail.title.rendered }} />
          <p>
            {metricType === 'imperial' ? (
              <span>{trail.custom_data.length} mi</span>
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
              !trail.custom_data.recommendedUse === ''
                ? !trail.custom_data.recommendedUse.some(el => el.value === 'hiking') &&
                  'inactive'
                : 'inactive'
            }
          />
          <img
            src="/static/images/menu/biking.svg"
            alt="Select Biking Trails"
            className={
              !trail.custom_data.recommendedUse === ''
                ? !trail.custom_data.recommendedUse.some(el => el.value === 'biking') &&
                  'inactive'
                : 'inactive'
            }
          />
          <img
            src="/static/images/menu/equestrian.svg"
            alt="Select Equestrian Trails"
            className={
              !trail.custom_data.recommendedUse === ''
                ? !trail.custom_data.recommendedUse.some(
                    el => el.value === 'equestrian'
                  ) && 'inactive'
                : 'inactive'
            }
          />
          <img
            src="/static/images/menu/ohv.svg"
            alt="Select OHV Trails"
            className={
              !trail.custom_data.recommendedUse === ''
                ? !trail.custom_data.recommendedUse.some(el => el.value === 'ohv') &&
                  'inactive'
                : 'inactive'
            }
          />
        </div>
        <style jsx>
          {`
            a {
              text-decoration: none;
              color: #777;
            }
            .trail {
              background: #eee;
              display: grid;
              grid-template-columns: 7.5rem 1fr 6.5rem;
              margin: 0 0 1rem;
              animation-fill-mode: forwards;
              &:nth-child(1) {
                opacity: 0;
                animation-name: slideUp;
                animation-duration: 500ms;
                animation-delay: 50ms;
              }
              &:nth-child(2) {
                opacity: 0;
                animation-name: slideUp;
                animation-duration: 500ms;
                animation-delay: 150ms;
              }
              &:nth-child(3) {
                opacity: 0;
                animation-name: slideUp;
                animation-duration: 500ms;
                animation-delay: 250ms;
              }
              &:nth-child(4) {
                opacity: 0;
                animation-name: slideUp;
                animation-duration: 500ms;
                animation-delay: 350ms;
              }
              &:nth-child(5) {
                opacity: 0;
                animation-name: slideUp;
                animation-duration: 500ms;
                animation-delay: 450ms;
              }
              img {
                max-width: 100%;
                height: auto;
              }
            }
            .details {
              padding: 0.25rem 1rem 1rem 1rem;
              h4 {
                margin: 0;
                font-weight: 700;
                a {
                  text-decoration: none;
                  color: inherit;
                }
              }
              p {
                margin: 0;
                font-weight: 500;
              }
              p span {
                font-weight: 100;
              }
            }
            .trail_type {
              display: grid;
              grid-template: 2.5rem 2.5rem / 2.5rem 2.5rem;
              align-self: center;
              img {
                width: 3.5rem;
              }
            }
            .inactive {
              opacity: 0.25;
              filter: grayscale();
            }
            @keyframes slideUp {
              from {
                transform: translateY(25rem);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
          `}
        </style>
      </a>
    </Link>
  </>
);

Trail.propTypes = {
  trail: trailShape.isRequired,
  highlightTrail: PropTypes.func.isRequired,
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
