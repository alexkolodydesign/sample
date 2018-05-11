import ElevationChart from './ElevationChart'

const TrailMap = props =>
  <div>
    <div className="map_container">
      <div className="map"></div>
      <ElevationChart />
    </div>
    <div className="buttons">
      <button>Download Printable Map</button>
      <button>Download GPS for Offline</button>
      <button>Share this Trail</button>
      <button>Save this Trail</button>
    </div>
    <style jsx>{`
      .map_container {background: #fff; padding:3rem;}
      .map {
        background: #eee;
        width: 100%;
        height: 50rem;
      }
      .buttons {
        margin-top: 3rem;
        display: grid;
        grid-template: 1fr 1fr / 1fr 1fr;
        grid-gap: 3rem 6rem;
      }
      button {
        border: none;
        border-radius: 1rem;
        background: #3fa9f5;
        padding: 1.5rem 3rem;
        color: #fff;
        font-size: 1.8rem;
        cursor: pointer;
        transition: all 500ms;
        &:hover {
          background: #0d93f2;
        }
      }
    `}</style>
  </div>

export default TrailMap
