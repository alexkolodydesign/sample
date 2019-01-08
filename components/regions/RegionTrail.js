import React from 'react';
import { InfoWindow, Marker } from 'react-google-maps';
import { connect } from 'react-redux';
import axios from 'axios';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Paths from '../trails/Paths';
import Difficulty from './Difficulty';
import { trailsShape, trailShape } from '../../lib/propTypes';

class RegionTrail extends React.Component {
  state = { coordinates: [], menu: false, menuCoords: false, loading: true };

  componentDidMount = () => {
    this.setCoordinates();
  };

  toggleMenu = coords => {
    this.setState(state => ({ menu: !state.menu, menuCoords: coords }));
  };

  setCoordinates = async () => {
    // If redux store already has coordinates on trail then set component state and set loading to false
    const { trails, trail, updateTrailCoords } = this.props;
    const { loading } = this.state;
    const matchingTrail = trails.find(reduxTrail => trail.slug === reduxTrail.slug);
    if (matchingTrail.coordinates) {
      if (!loading)
        this.setState({ loading: false, coordinates: matchingTrail.coordinates });
      return;
    }
    // If trail does not have json coordinates exit here
    if (!trail.custom_data.jsonCoordinates.url) {
      updateTrailCoords([], trail.slug);
      return;
    }
    // If trail coordinates are not found in redux store try and get them
    axios.get(`/api/coordinates?url=${trail.custom_data.jsonCoordinates.url}`).then(
      data => {
        const coords = data.data.trail.coordinates;
        updateTrailCoords(coords, trail.slug);
        if (!loading) this.setState({ loading: false, coordinates: coords });
      },
      error => {
        console.log(error);
      }
    );
  };

  render() {
    const { loading } = this.state;
    if (loading) return null;
    // If coordinates loaded then proceed to create variables and render
    const { trail, metricType } = this.props;
    const { coordinates, menu, menuCoords } = this.state;
    // Change Trail Color Based on the First Value of Recommended Use Array
    let trailColor;
    if (trail.custom_data.recommendedUse) {
      switch (trail.custom_data.recommendedUse[0].value) {
        case 'hiking':
          trailColor = '#ed264c';
          break;
        case 'biking':
          trailColor = '#ff9100';
          break;
        case 'equestrian':
          trailColor = '#662f8e';
          break;
        case 'ohv':
          trailColor = '#00a89c';
          break;
        default:
          trailColor = '#ff0000';
      }
    } else {
      trailColor = '#ff0000';
    }
    return (
      <React.Fragment>
        <Paths
          coordinates={coordinates}
          toggleMenu={this.toggleMenu}
          regionTrail={this}
          trail={trail}
          trailColor={trailColor}
          slug={trail.slug}
        />
        {menu && (
          <Marker position={menuCoords} icon={{ url: '' }}>
            <InfoWindow
              options={{ maxWidth: 320 }}
              onCloseClick={() => {
                this.togglePopupMenu(trail.trailName);
              }}
            >
              <div className="info_wrapper">
                <h3
                  className="top"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: trail.title.rendered }}
                />
                <div className="info">
                  {trail.custom_data.length && (
                    <React.Fragment>
                      {metricType === 'imperial' ? (
                        <p>
                          Length:{' '}
                          <span>{Number(trail.custom_data.length).toFixed(2)} mi</span>
                        </p>
                      ) : (
                        <p>
                          Length:{' '}
                          <span>
                            {(Number(trail.custom_data.length) * 1.60934).toFixed(2)} km
                          </span>
                        </p>
                      )}
                    </React.Fragment>
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
                      {trail.custom_data.recommendedUse.some(
                        el => el.value === 'hiking'
                      ) && (
                        <img src="/static/images/menu/hiking.svg" alt="Hiking Trail" />
                      )}
                      {trail.custom_data.recommendedUse.some(
                        el => el.value === 'biking'
                      ) && (
                        <img src="/static/images/menu/biking.svg" alt="Biking Trail" />
                      )}
                      {trail.custom_data.recommendedUse.some(
                        el => el.value === 'equestrian'
                      ) && (
                        <img
                          src="/static/images/menu/equestrian.svg"
                          alt="Equestrian Trail"
                        />
                      )}
                      {trail.custom_data.recommendedUse.some(
                        el => el.value === 'ohv'
                      ) && <img src="/static/images/menu/ohv.svg" alt="OHV Trail" />}
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
        )}
      </React.Fragment>
    );
  }
}

RegionTrail.propTypes = {
  trails: trailsShape.isRequired,
  trail: trailShape.isRequired,
  updateTrailCoords: PropTypes.func.isRequired,
  metricType: PropTypes.string.isRequired
};

// Redux
const mapStateToProps = (state, ownProps) => ({
  map: state.map,
  trails: state.trails,
  popupMenus: state.map.popupMenus,
  ...ownProps
});
const mapDispatchToProps = dispatch => ({
  updateTrailCoords: (coords, slug) => {
    const data = { coords, slug };
    return dispatch({ type: 'UPDATE_TRAIL_COORDINATES', data });
  },
  togglePopups: trail =>
    dispatch({
      type: 'TOGGLE_POPUPMENUS',
      popups: {
        regionPopup: false,
        activeRegionPopup: '',
        trailPopup: true,
        activeTrailPopup: trail
      }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionTrail);
