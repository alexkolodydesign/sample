import React from 'react';
import { GoogleMap, Marker } from 'react-google-maps';
import { BeatLoader } from 'react-spinners';
import Paths from './Paths';
import ElevationChart from './ElevationChart';
import setCenterAndZoom from '../../utils/setCenterAndZoom';
import { trailShape } from '../../utils/propTypes';
import TrailCoordinatesData from '../services/TrailCoordinatesData';

class TrailChart extends React.Component {
  state = { mapStyle: 'roadmap' };

  mapLoaded = React.createRef();

  pathMarker = location => {
    this.setState({ marker: location });
  };

  render() {
    const { trail } = this.props;
    const trailhead =
      trail.custom_data.trailhead_latitude && trail.custom_data.trailhead_longitude
        ? {
            lat: Number(trail.custom_data.trailhead_latitude),
            lng: Number(trail.custom_data.trailhead_longitude)
          }
        : false;
    const { url } = trail.custom_data.jsonCoordinates;
    const connectorUrl = trail.custom_data.connectorTrailJSON.url;
    if (!url) return 'No coordinates found.';
    const { mapStyle, marker } = this.state;
    const { google } = window;
    // Change Trail Color Based on the First Value of Recommended Use Array
    let trailColor;
    if (trail.custom_data.recommendedUse[0]) {
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
      <TrailCoordinatesData url={url} connectorUrl={connectorUrl}>
        {({ loading, coordinates, connectorCoordinates }) => {
          if (loading) return <BeatLoader color="#0098e5" />;
          if (!coordinates) return 'No coordinates found.';
          const { zoom, center } = setCenterAndZoom(
            coordinates,
            connectorCoordinates,
            trailhead
          );
          return (
            <>
              <GoogleMap
                ref={this.mapLoaded}
                zoom={zoom}
                center={center}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ&v=3.exp&libraries=geometry,drawing,places"
                options={{ styles: mapStyle }}
                defaultOptions={{ streetViewControl: false }}
              >
                <Paths
                  coordinates={coordinates}
                  toggleMenu={this.toggleMenu}
                  trailColor={trailColor}
                  slug={trail.slug}
                />
                <Paths
                  coordinates={connectorCoordinates}
                  trailColor="#000000"
                  slug={trail.slug}
                />
                {marker && <Marker position={marker} />}
                {trail.custom_data.trailhead_latitude &&
                  trail.custom_data.trailhead_longitude && (
                    <Marker
                      position={{
                        lat: Number(trail.custom_data.trailhead_latitude),
                        lng: Number(trail.custom_data.trailhead_longitude)
                      }}
                      icon={{
                        url: '/static/images/trailhead-icon.png',
                        scaledSize: new google.maps.Size(20, 25)
                      }}
                    />
                  )}
                {trail.custom_data.poi &&
                  trail.custom_data.poi.map(poi => {
                    const poi_icon = poi.icon
                      ? poi.icon
                      : '/static/images/trailhead-icon.png';
                    return (
                      <Marker
                        key={`uniquekey${poi.latitude}${poi.longitude}`}
                        position={{
                          lat: Number(poi.latitude),
                          lng: Number(poi.longitude)
                        }}
                        icon={{
                          url: poi_icon,
                          scaledSize: new google.maps.Size(20, 25)
                        }}
                      />
                    );
                  })}
              </GoogleMap>
              {trail.custom_data.recommendedUse[0] &&
                trail.custom_data.recommendedUse[0].value !== 'ohv' && (
                  <ElevationChart
                    coordinates={coordinates.slice(0).reverse()}
                    trail={trail}
                    areaStrokeColor={trailColor}
                    pathMarker={this.pathMarker}
                  />
                )}
            </>
          );
        }}
      </TrailCoordinatesData>
    );
  }
}

TrailChart.propTypes = {
  trail: trailShape.isRequired
};

export default TrailChart;
