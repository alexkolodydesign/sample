class ElevationChart extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h2>Elevation</h2>
        <div className="chart"></div>
        <div className="details">
          <div className="stats">
            <p>Total Distance: </p>
            <p>Max Elevation: </p>
            <p>Min Elevation: </p>
          </div>
          <div className="map_type">
            <img src="/static/images/menu/hiking.svg" alt="Select Hiking Trails" />
            <img src="/static/images/menu/biking.svg" alt="Select Biking Trails" />
            <img src="/static/images/menu/horse.svg" alt="Select Horseback Trails" />
            <img src="/static/images/menu/atv.svg" alt="Select ATV Trails" />
          </div>
        </div>
        <style jsx>{`
          h2 {margin: 0;}
          .chart {
            background: #eee;
            height: 15rem;
            width: 100%;
          }
          .details {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
          .map_type {
            display: grid;
            grid-template: repeat(2, 6rem) / repeat(2, 6rem);
            img {
              width: 5rem;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default ElevationChart
