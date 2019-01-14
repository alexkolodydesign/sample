import React from 'react';
import { connect } from 'react-redux';
import { trailsShape, trailShape } from '../../utils/propTypes';

class DownloadGPS extends React.Component {
  state = { loading: true };

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    if (loading) return <div>Loading GPX...</div>;
    const { trails, trail } = this.props;
    const matchTrail = trails.find(reduxTrail => reduxTrail.slug === trail.slug);
    let gpxString = '';
    if (matchTrail.coordinates) {
      for (let i = 0; i < matchTrail.coordinates.length; i += 1) {
        gpxString += `
          <trkpt lat="${matchTrail.coordinates[i].lat}" lon="${
          matchTrail.coordinates[i].lng
        }">
            <ele>${matchTrail.coordinates[i].elevation}</ele>
          </trkpt>
        `;
      }
    }
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
  }
}

DownloadGPS.propTypes = {
  trails: trailsShape.isRequired,
  trail: trailShape.isRequired
};

// Redux
const mapStateToProps = state => ({
  trails: state.trails
});

export default connect(
  mapStateToProps,
  null
)(DownloadGPS);
