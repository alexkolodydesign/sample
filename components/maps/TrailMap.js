import React from 'react';
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import TrailChart from '../trails/TrailChart';
import ShareButtons from '../shared/ShareButtons';
import DownloadGPS from '../trails/DownloadGPS';
import printStyle from './mapstyles/print';
import { trailShape } from '../../utils/propTypes';
import TrailMapStyles from './TrailMap.styles';

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
      <TrailMapStyles>
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
      </TrailMapStyles>
    );
  }
}

TrailMap.propTypes = {
  trail: trailShape.isRequired
};

const MapContainer = withScriptjs(
  withGoogleMap(({ trail, mapStyle }) => <TrailChart trail={trail} mapStyle={mapStyle} />)
);
