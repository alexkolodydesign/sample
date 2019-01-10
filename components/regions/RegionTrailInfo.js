import React from 'react';
import { InfoWindow, Marker } from 'react-google-maps';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Difficulty from './Difficulty';
import { coordinateShape, trailShape } from '../../lib/propTypes';

const RegionTrailInfo = ({ menuCoords, togglePopups, trail, metricType }) => (
  <Marker position={menuCoords} icon={{ url: '' }}>
    <InfoWindow options={{ maxWidth: 320 }} onCloseClick={() => togglePopups('')}>
      <div className="info_wrapper">
        <h3
          className="top"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: trail.title.rendered }}
        />
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
            <img src={trail.custom_data.media.pictures[0].sizes.medium} alt="" />
          )}
          <br />
          <Link href={`/trails/${trail.slug}`}>
            <a href={`/trails/${trail.slug}`}> View Trail</a>
          </Link>
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
        <style jsx>
          {`
            h3 {
              padding: 0 0 6px;
              color: #777;
              border-bottom: 1px solid #ccc;
            }
            p {
              font-weight: bold;
              margin: 0 0 1rem;
              color: #777;
              span {
                font-weight: normal;
              }
              &:last-of-type {
                margin-bottom: 10px;
              }
            }
            .info_wrapper {
              min-height: 250px;
              width: 100%;
              overflow-x: hidden;
              .image {
                img {
                  max-height: 150px;
                }
              }
              .icons {
                padding-top: 2em;
              }
            }
            a {
              text-decoration: none;
              color: #3fa9f5;
              font-weight: bold;
              padding: 3px 0 0;
              &:hover {
                text-decoration: none;
                color: #000;
              }
            }
            .gm-style .gm-style-iw {
              left: 10px;
              top: 5px;
            }
            .trail_type {
              display: grid;
              grid-template: 2.5rem 2.5rem / 2.5rem 2.5rem;
              align-self: center;
              img {
                width: 3.5rem;
              }
            }

            @media screen and (min-width: 768px) {
              .info_wrapper {
                display: grid;
                height: 100%;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 10% 45% 45%;
                grid-template-areas: 'top top top' 'info info info' 'image image icons';
                min-width: 300px;
                min-height: 250px;
                width: 100%;
                .top {
                  grid-area: top;
                  margin: 0;
                }
                .info {
                  grid-area: info;
                  padding-top: 1rem;
                }
                .image {
                  grid-area: image;
                  img {
                    padding: 1.5rem 0;
                    max-width: 140px;
                    height: auto;
                  }
                }
                .icons {
                  padding-top: 1rem;
                  grid-area: icons;
                }
              }
            }
          `}
        </style>
      </div>
    </InfoWindow>
  </Marker>
);

RegionTrailInfo.propTypes = {
  menuCoords: coordinateShape.isRequired,
  togglePopups: PropTypes.func.isRequired,
  trail: trailShape.isRequired,
  metricType: PropTypes.string.isRequired
};

export default RegionTrailInfo;
