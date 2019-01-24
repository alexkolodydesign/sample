import React from 'react';
import TrailCoordinatesData from '../services/TrailCoordinatesData';
import { trailShape } from '../../utils/propTypes';
import Button from '../shared/Button.styles';

const DownloadGPS = ({ trail }) => {
  function generateGPX(coordinates) {
    let gpxString = '';
    if (coordinates) {
      for (let i = 0; i < coordinates.length; i += 1) {
        gpxString += `
            <trkpt lat="${coordinates[i].lat}" lon="${coordinates[i].lng}">
              <ele>${coordinates[i].elevation}</ele>
            </trkpt>
          `;
      }
    }
    return gpxString;
  }
  const { url } = trail.custom_data.jsonCoordinates;
  if (!url)
    return (
      <Button type="button" disabled>
        Download GPS
      </Button>
    );
  return (
    <TrailCoordinatesData url={url}>
      {({ loading, coordinates }) => {
        if (loading)
          return (
            <Button type="button" disabled>
              Download GPS
            </Button>
          );
        const gpxString = generateGPX(coordinates);
        return (
          <Button
            type="button"
            onClick={() => {
              function download(filename, text) {
                const element = document.createElement('a');
                element.setAttribute(
                  'href',
                  `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
                );
                element.setAttribute('download', filename);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }
              download(
                `${trail.slug}.gpx`,
                `
                <?xml version="1.0" encoding="utf-8" standalone="yes"?>
                <gpx version="1.1" creator="GPS Visualizer http://www.gpsvisualizer.com/" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
                <trk>
                  <name>${trail.title.rendered}</name>
                  <trkseg>
                    ${gpxString}
                  </trkseg>
                </trk>
                </gpx>
              `
              );
            }}
          >
            <img src="/static/images/trail/download.svg" alt="Event List" />
            <span>Download GPS</span>
          </Button>
        );
      }}
    </TrailCoordinatesData>
  );
};

DownloadGPS.propTypes = {
  trail: trailShape.isRequired
};

export default DownloadGPS;
