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
    <div className="background"></div>
    <div className="wrapper">
      <div className="utahElevated">
        <img src="../../static/images/UTAH_LIFE_ELEVATED_RGB_navy-web.png" alt="Utah Life Elevated" />
      </div>
      <SelectTrailType />
      <FilterTrails />
      <TrailList />
      <GPS />
      <Settings />

    </div>
    <style jsx>{`
      .menu {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        padding: 1.5rem 0;
        .wrapper {
          display: grid;
          grid-template-columns: 1fr 10rem 5rem 5rem 5rem 5rem;
          align-items: center;
          justify-items: center;
          position: relative;
        }
      }
      .utahElevated {
        position: relative;
        z-index: 100;
        img {
          max-width: 80px;
          margin-right: 12px;
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
      .magenta { background: #ed264b; }
      .orange { background: #ff5a00; }
      .purple { background: #662f8e; }
      .aqua { background: #00a89c; }

      .background {
        position: absolute;
        top: 1rem;
        width: 100%;
        height: calc(100% - 1rem);
        background-image: linear-gradient(rgba(255,255,255,0.98), rgba(255,255,255,0.98)), url(/static/images/background-pattern.svg);
        background-position: center;
        background-size: 29rem auto;
      }

      @media screen and (min-width: 768px) {
        .menu {
          padding: 2rem 0;
          .wrapper {
            grid-template-columns: 1fr 28rem repeat(2, 14rem) repeat(2, 6.5rem) 10px;
          }
        }
        .utahElevated {
          img {
            max-width: 150px;
          }
        }
      }
      @media screen and (min-width: 992px) {
        .menu {
          padding: 2.5rem 0;
          .wrapper {
            grid-template-columns: 1fr 28rem repeat(2, 14rem) repeat(2, 6.5rem) 10px;
          }
        }
      }
    `}</style>
  </div>

export default MainMenu
