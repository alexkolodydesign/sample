import { connect } from 'react-redux'

// Redux
const mapStateToProps = (state, ownProps) => {
  return {
    trails: state.trails,
    ...ownProps
  };
};
const mapDispatchToProps = null;

export class DownloadGPS extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }
  componentDidMount() {
    this.setState({loading: false})
  }
  render() {
    if (this.state.loading) return <button>Loading GPX...</button>
    const matchTrail = this.props.trails.find(trail => trail.slug === this.props.trail.slug)
    let gpxString = ''
    if (matchTrail.coordinates) {
      for (var i = 0; i < matchTrail.coordinates.length; i++) {
        gpxString += `
          <trkpt lat="${ matchTrail.coordinates[i].lat}" lon="${ matchTrail.coordinates[i].lng}">
            <ele>${ matchTrail.coordinates[i].elevation}</ele>
          </trkpt>
        `
      }
    }
    return (
      <button
        onClick={
          () => {
            function download(filename, text) {
              const element = document.createElement('a');
              element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
              element.setAttribute('download', filename);
              element.style.display = 'none';
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }
            download(`${this.props.trail.slug}.gpx`, `
              <?xml version="1.0" encoding="utf-8" standalone="yes"?>
              <gpx version="1.1" creator="GPS Visualizer http://www.gpsvisualizer.com/" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
              <trk>
                <name>${this.props.trail.title.rendered}</name>
                <trkseg>
                  ${gpxString}
                </trkseg>
              </trk>
              </gpx>
            `)
          }
        }
      >
        <img src="/static/images/trail/download.svg" alt="Event List"/>
        <span>Download GPS</span>
        <style jsx>{`
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
        `}</style>
      </button>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DownloadGPS)
