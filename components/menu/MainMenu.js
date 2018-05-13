import SelectTrailType from '../filters/SelectTrailType'
import FilterTrails from '../filters/FilterTrails'
import TrailList from './TrailList'
import GPS from './GPS'
import Settings from './Settings'

const MainMenu = props =>
  <div className="menu">
    <div className="colors">
      <div className="magenta"></div>
      <div className="orange"></div>
      <div className="purple"></div>
      <div className="aqua"></div>
    </div>
    <div className="wrapper">
      <SelectTrailType />
      <FilterTrails />
      <TrailList system={props.system} />
      <GPS />
      <Settings />
    </div>
    <style jsx>{`
      .menu {
        position: absolute;
        bottom: 3rem;
        left: 0;
        z-index: 2;
        width: 100%;
        padding: 4rem 0;
        background: #fff;
        .wrapper {
          display: grid;
          grid-template-columns: 1fr 28rem repeat(2, 15rem) repeat(2, 6rem);
          align-items: center;
          justify-items: center;
          position: relative;
        }
      }

      .colors {
        position: absolute;
        top: 0;
        width: 100%;
        height: 1rem;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
      }
      .magenta { background: #ec1e79; }
      .orange { background: #ff5a00; }
      .purple { background: #662f8e; }
      .aqua { background: #00a89c; }
    `}</style>
  </div>

export default MainMenu
