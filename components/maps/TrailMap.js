import React from 'react';
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import TrailChart from '../trails/TrailChart';
import ShareButtons from '../shared/ShareButtons';
import DownloadGPS from '../trails/DownloadGPS';
import printStyle from './mapstyles/print';
import { trailShape } from '../../utils/propTypes';

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export default class TrailMap extends React.Component {
  state = {
    mapStyle: 'roadmap',
    shareButtons: false
  };

  toggleShareButtons = () => {
    const { shareButtons } = this.state;
    this.setState({ shareButtons: !shareButtons });
  };

  toggleMapStyle = () => {
    const { mapStyle } = this.state;
    if (!mapStyle) this.setState({ mapStyle: printStyle });
    else this.setState({ mapStyle: 'roadmap' });
  };

  printMap = () => {
    window.print();
    return true;
  };

  render() {
    const { trail } = this.props;
    const { mapStyle, shareButtons } = this.state;
    const linkToTrailHead = `https://www.google.com/maps/place/${trail.custom_data
      .trailhead_latitude || ''},${trail.custom_data.trailhead_longitude || ''}`;
    return (
      <div className="trail_map">
        <div className="map_container">
          <MapContainer
            loadingElement={<div style={{ height: `40rem` }} />}
            containerElement={<div style={{ height: `100%` }} id="washington_map" />}
            mapElement={<div style={{ height: `40rem` }} />}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ&v=3.exp&libraries=geometry,drawing,places"
            trail={trail}
            mapStyle={mapStyle}
          />
        </div>
        <div className="buttons">
          <button
            type="button"
            onClick={this.toggleShareButtons}
            className={shareButtons && 'active'}
          >
            <img src="/static/images/trail/share.svg" alt="Event List" />
            <span>Share Trail</span>
          </button>
          <DownloadGPS trail={trail} />
          <button
            type="button"
            onClick={async () => {
              this.toggleMapStyle();
              await timeout(250);
              this.printMap();
              await timeout(250);
              this.toggleMapStyle();
            }}
          >
            <img src="/static/images/trail/print.svg" alt="Print Map" /> Print Map
          </button>
          <a href={linkToTrailHead} target="_blank" rel="noopener noreferrer">
            <img src="/static/images/menu/gps.svg" alt="Directions" />
            <span>Directions to Trail Head</span>
          </a>
        </div>
        <div className="share_buttons">{shareButtons && <ShareButtons />}</div>
        <style jsx>
          {`
            @media screen {
              .trail_map {
                grid-column-start: 1;
                grid-column-end: 2;
                grid-row-start: 1;
                grid-row-end: 2;
              }
              .map_container {
                background: #fff;
                background-image: linear-gradient(
                    rgba(255, 255, 255, 0.98),
                    rgba(255, 255, 255, 0.98)
                  ),
                  url(/static/images/background-pattern.svg);
                background-position: center;
                background-size: 29rem auto;
                padding: 1rem;
              }
              .map {
                background: #eee;
                width: 100%;
                height: 50rem;
              }
              .buttons {
                margin-top: 3rem;
                display: grid;
                grid-template: repeat(2, minmax(0, 1fr)) / repeat(2, minmax(0, 1fr));
                grid-gap: 1.5rem;
              }
              .share_buttons {
                margin-top: 1.5rem;
              }
              button,
              a {
                border: none;
                border-radius: 1rem;
                background: #3fa9f5;
                padding: 1rem 2rem;
                color: #fff;
                font-size: 1.8rem;
                cursor: pointer;
                transition: all 500ms;
                display: flex;
                align-items: center;
                justify-content: center;
                &:hover {
                  background: #0d93f2;
                }
                &:last-of-type:not(button) {
                  background: #262727;
                  grid-column-start: 1;
                  grid-column-end: 2;
                  grid-row-start: 1;
                  grid-row-end: 2;
                  text-align: center;

                  &:hover {
                    background: #666666;
                  }
                }
                &.active {
                  background-color: #00a89c;
                }
                img {
                  width: 3rem;
                  height: 3rem;
                  margin-right: 1rem;
                }
              }
            }
            @media screen and (min-width: 768px) {
              .map_container {
                padding: 1em;
              }
              .buttons {
                margin-top: 1.5rem;
                grid-template: 1fr 1fr / 1fr 1fr 1fr;
                a {
                  &:last-of-type {
                    text-decoration: none;
                    // grid-column-start: 1;
                    // grid-column-end: 4;
                    // grid-row-start: 2;
                    // grid-row-end: 3;

                    grid-column: 1 / span 3;
                    grid-row: 2;
                  }
                }
              }
              .trail_map {
                grid-column-start: 2;
                grid-column-end: 3;
              }
            }
            @media screen and (min-width: 992px) {
              .map_container {
                padding: 3em;
              }
            }
            @media print {
              *,
              *:before,
              *:after {
                background: #ffffff;
              }
              .trail_map {
                width: 55%;
                float: left;
                margin-left: 4%;
              }
              .map_container,
              .gm-style,
              .gm-style * {
                max-width: 100%;
              }
              .buttons {
                display: none;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

TrailMap.propTypes = {
  trail: trailShape.isRequired
};

const MapContainer = withScriptjs(
  withGoogleMap(({ trail, mapStyle }) => <TrailChart trail={trail} mapStyle={mapStyle} />)
);
