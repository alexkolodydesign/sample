import React from 'react';
import { InfoWindow, Marker } from 'react-google-maps';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Difficulty from '../shared/Difficulty';
import { coordinateShape, trailShape } from '../../utils/propTypes';
import RegionTrailInfoStyles from './RegionTrailInfo.styles';

const RegionTrailInfo = ({ menuCoords, togglePopups, trail, metricType }) => (
  <Marker position={menuCoords} icon={{ url: '' }}>
    <InfoWindow options={{ maxWidth: 320 }} onCloseClick={() => togglePopups('')}>
      <RegionTrailInfoStyles>
          <Link href={`/trails/${trail.slug}`}>
            <a className="top" href={`/trails/${trail.slug}`}>
              <h3
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: `${trail.title.rendered} >>` }}
              />
            </a>
          </Link>
        <div className="info">
          {trail.custom_data.length && (
            <>
              {metricType === 'imperial' ? (
                <p>
                  Length: <span>{Number(trail.custom_data.length).toFixed(2)} mi</span>
                </p>
              ) : (
                <p>
                  Length:{' '}
                  <span>
                    {(Number(trail.custom_data.length) * 1.60934).toFixed(2)} km
                  </span>
                </p>
              )}
            </>
          )}
          {trail.custom_data.highlights && (
            <p>
              Highlights:{' '}
              {trail.custom_data.highlights.map(highlight => (
                <span key={highlight.value}>{highlight.label} </span>
              ))}
            </p>
          )}
          {trail.custom_data.trailSurface && (
            <p>
              Trail Surface: <span>{trail.custom_data.trailSurface}</span>
            </p>
          )}
          {trail.custom_data.trailTraffic && (
            <p>
              Trail Traffic: <span>{trail.custom_data.trailTraffic.label}</span>
            </p>
          )}
          {/* REVIEW: Is Difficulty being done correctly here? Also check TrailSidebar.js */}
          {trail.custom_data.difficulty && (
            <Difficulty difficulty={trail.custom_data.difficulty} mainMap />
          )}
        </div>
        <div className="image">
          {trail.custom_data.media.pictures[0] && (
            <Link href={`/trails/${trail.slug}`}>
              <a href={`/trails/${trail.slug}`}>
                <img src={trail.custom_data.media.pictures[0].sizes.medium} alt="" />
              </a>
            </Link>
          )}
          <br />
        </div>
        <div className="icons">
          {trail.custom_data.recommendedUse && (
            <div className="trail_type">
              {trail.custom_data.recommendedUse.some(el => el.value === 'hiking') && (
                <img src="/static/images/menu/hiking.svg" alt="Hiking Trail" />
              )}
              {trail.custom_data.recommendedUse.some(el => el.value === 'biking') && (
                <img src="/static/images/menu/biking.svg" alt="Biking Trail" />
              )}
              {trail.custom_data.recommendedUse.some(el => el.value === 'equestrian') && (
                <img src="/static/images/menu/equestrian.svg" alt="Equestrian Trail" />
              )}
              {trail.custom_data.recommendedUse.some(el => el.value === 'ohv') && (
                <img src="/static/images/menu/ohv.svg" alt="OHV Trail" />
              )}
            </div>
          )}
        </div>
      </RegionTrailInfoStyles>
    </InfoWindow>
  </Marker>
);

// Redux
const mapStateToProps = state => ({
  metricType: state.map.metricType,
  menuCoords: state.map.popupMenus.menuCoords
});
const mapDispatchToProps = dispatch => ({
  togglePopups: (trail, coords) =>
    dispatch({
      type: 'TOGGLE_POPUPMENUS',
      popups: {
        regionPopup: false,
        activeRegionPopup: '',
        trailPopup: true,
        activeTrailPopup: trail,
        menuCoords: coords
      }
    })
});

RegionTrailInfo.propTypes = {
  menuCoords: coordinateShape.isRequired,
  togglePopups: PropTypes.func.isRequired,
  trail: trailShape.isRequired,
  metricType: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionTrailInfo);
