import React from 'react';
import TrailCoordinatesData from '../services/TrailCoordinatesData';
import { trailShape } from '../../utils/propTypes';

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
      <button type="button" disabled>
        Download GPS
      </button>
    );
  return (
    <TrailCoordinatesData url={url}>
      {({ loading, coordinates }) => {
        if (loading)
          return (
            <button type="button" disabled>
              Download GPS
            </button>
          );
        const gpxString = generateGPX(coordinates);
        return (
          <button
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
            <style jsx>
              {`
                button {
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
                  img {
                    width: 3rem;
                    height: 3rem;
                    margin-right: 1rem;
                  }
                }
              `}
            </style>
          </button>
        );
      }}
    </TrailCoordinatesData>
  );
};

DownloadGPS.propTypes = {
  trail: trailShape.isRequired
};

export default DownloadGPS;
