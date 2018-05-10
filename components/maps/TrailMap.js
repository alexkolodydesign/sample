import ElevationChart from './ElevationChart'

const TrailMap = props =>
  <div>
    <div className="map_container">
      <div className="map"></div>
      <ElevationChart />
    </div>
    <style jsx>{`
      .map_container {background: #fff; padding:3rem;}
      .map {
        background: #eee;
        width: 100%;
        height: 50rem;
      }
    `}</style>
  </div>

export default TrailMap
