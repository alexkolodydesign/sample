/* eslint-disable import/extensions */
import React from 'react';
import { Marker, Polygon, InfoWindow, GroundOverlay } from 'react-google-maps';
import PropTypes from 'prop-types';
import LatLng from 'google-map-react/lib/utils/lib_geo/lat_lng.js';
import LatLngBounds from 'google-map-react/lib/utils/lib_geo/lat_lng_bounds.js';
import { connect } from 'react-redux';
import { togglePopupMenus } from '../../redux/actions';
import alpineCoordinates from '../../data/alpine-coordinates';
import desertCoordinates from '../../data/desert-coordinates';
import canyonCoordinates from '../../data/canyon-coordinates';
import mesaCoordinates from '../../data/mesa-coordinates';
import urbanCoordinates from '../../data/urban-coordinates';
import { popupMenusShape, regionShape } from '../../lib/propTypes';

class Region extends React.Component {
  state = { menu: false };

  toggleMenu = () => {
    const { menu } = this.state;
    this.setState({ menu: !menu });
  };

  togglePopupMenu = region => {
    const { popupMenus, togglePopupMenus: toggle } = this.props;
    const { regionPopup, activeRegionPopup, activePopupType } = popupMenus;
    // if there is a popup open, but it is not the one that is clicked, close the current
    if (regionPopup === true && !(activeRegionPopup === region)) {
      if (popupMenus.activePopupType === 'region') {
        toggle({
          trailPopup: false,
          regionPopup: 'exiting'
        });
      } else {
        toggle({
          regionPopup: false,
          trailPopup: 'exiting'
        });
      }
      toggle({
        regionPopup: false,
        trailPopup: false,
        activeRegionPopup: '',
        activeTrailPopup: '',
        activePopupType: ''
      });
    } else if (regionPopup === true) {
      // no popup, check this one
      if (activePopupType === 'region') {
        togglePopupMenus({
          trailPopup: false,
          regionPopup: 'exiting'
        });
      } else {
        toggle({
          regionPopup: false,
          trailPopup: 'exiting'
        });
      }
      setTimeout(
        () =>
          toggle({
            regionPopup: false,
            trailPopup: false,
            activeRegionPopup: '',
            activeTrailPopup: '',
            activePopupType: ''
          }),
        500
      );
    } else {
      toggle({
        regionPopup: true,
        trailPopup: false,
        activeRegionPopup: region,
        activeTrailPopup: '',
        activePopupType: 'region'
      });
    }
  };

  render() {
    const {
      region,
      zoomLevel,
      firstTimeUser,
      highlightRegion,
      popupMenus,
      zoom,
      onRegionToggle
    } = this.props;
    const { regionName, overlayImage, markerCoordinates } = region;
    const { menu } = this.state;
    const { google } = window;
    let coordinates;
    switch (region.regionName) {
      case 'Alpine':
        coordinates = alpineCoordinates;
        break;
      case 'Desert':
        coordinates = desertCoordinates;
        break;
      case 'Canyon':
        coordinates = canyonCoordinates;
        break;
      case 'Mesa':
        coordinates = mesaCoordinates;
        break;
      case 'Urban':
        coordinates = urbanCoordinates;
        break;
      default:
        coordinates = [];
    }
    // Make new bounds
    const newBounds = new LatLngBounds();
    // Add LatLng points to the new bounding area
    coordinates.forEach(bound => newBounds.extend(new LatLng(bound.lat, bound.lng)));
    if (!coordinates) return null;
    return (
      <React.Fragment>
        {zoomLevel < 12 && (
          <React.Fragment>
            <GroundOverlay
              defaultUrl={overlayImage}
              defaultBounds={
                new google.maps.LatLngBounds(
                  newBounds.getSouthWest(),
                  newBounds.getNorthEast()
                )
              }
              defaultOpacity={firstTimeUser === true ? 1 : 0}
            />
            <Polygon
              paths={coordinates}
              options={{
                strokeColor: highlightRegion === regionName ? '#000' : '#FFF',
                strokeOpacity: 1,
                strokeWeight: 3,
                fillColor: '#ffffff',
                fillOpacity: 0,
                clickable: highlightRegion !== regionName,
                zIndex: highlightRegion === regionName ? '2' : '1'
              }}
              // eslint-disable-next-line react/jsx-no-bind
              onMouseOver={function regionHoverOver() {
                this.setOptions({ fillOpacity: 0.5 });
              }}
              onFocus={() => {}}
              onBlur={() => {}}
              // eslint-disable-next-line react/jsx-no-bind
              onMouseOut={function regionHoverOut() {
                this.setOptions({ fillOpacity: 0 });
              }}
              onClick={() =>
                zoom(
                  11.75,
                  {
                    lat: markerCoordinates.lat,
                    lng: markerCoordinates.lng
                  },
                  regionName
                )
              }
            />
          </React.Fragment>
        )}
        {zoomLevel < 12 && (
          <Marker
            className={popupMenus.regionPopup ? 'active region_popup' : 'region_popup'}
            position={{
              lat: region.markerCoordinates.lat,
              lng: region.markerCoordinates.lng
            }}
            icon={{
              url: region.markerIcon,
              scaledSize: new google.maps.Size(68, 68)
            }}
            onClick={() => {
              // this.toggleMenu()
              onRegionToggle(this);
              this.togglePopupMenu(region.regionName);
            }}
          >
            {menu && popupMenus.regionPopup && (
              <InfoWindow
                options={{ maxWidth: 320 }}
                onCloseClick={() => {
                  onRegionToggle(this);
                  this.togglePopupMenu(region.regionName);
                  // this.setState({menu: false})
                }}
              >
                <div className="info_wrapper">
                  <h3>{region.regionName}</h3>
                  <p>{region.trailCount} Trails</p>
                  {region.regionImage && <img src={region.regionImage} alt="" />}
                  <button
                    type="button"
                    className="explore"
                    onClick={() =>
                      zoom(12, {
                        lat: region.markerCoordinates.lat,
                        lng: region.markerCoordinates.lng
                      })
                    }
                  >
                    Explore Region
                  </button>
                </div>
              </InfoWindow>
            )}
          </Marker>
        )}
        <style jsx>
          {`
            .explore {
              color: #3fa9f5;
              cursor: pointer;
              font-weight: 500;
            }
            .info_wrapper {
              display: block;
              min-width: 100%;
              overflow-x: hidden;
              img {
                max-width: 150px;
              }
            }

            @media screen and (min-width: 768px) {
              .info_wrapper {
                display: grid;
              }
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

Region.propTypes = {
  popupMenus: popupMenusShape.isRequired,
  togglePopupMenus: PropTypes.func.isRequired,
  region: regionShape.isRequired,
  zoomLevel: PropTypes.number.isRequired,
  zoom: PropTypes.func.isRequired,
  firstTimeUser: PropTypes.bool.isRequired,
  highlightRegion: PropTypes.string.isRequired,
  onRegionToggle: PropTypes.func.isRequired
};

// Redux
const mapStateToProps = state => ({
  popupMenus: state.map.popupMenus,
  highlightRegion: state.map.highlightRegion
});
const mapDispatchToProps = dispatch => ({
  togglePopupMenus: popups => dispatch(togglePopupMenus(popups))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Region);
