import SelectTrailType from '../filters/SelectTrailType'
import FilterTrails from '../filters/FilterTrails'
import TrailList from './TrailList'
import GPS from './GPS'
import Settings from './Settings'


const MainMenu = props =>
  <div className={props.trailPage ? 'trailMenu menu' : 'menu'}>
    <div className="colors">
      <div className="magenta"></div>
      <div className="orange"></div>
      <div className="purple"></div>
      <div className="aqua"></div>
    </div>
    <div className="background"></div>
    <div className="wrapper">
      <div className="footerLogos">
        <img src="/static/images/UTAH_LIFE_ELEVATED_RGB_navy-web.png" alt="Utah Life Elevated" />
        <img src="/static/images/washco-logo.png" alt="Washington County, Utah" />
      </div>
      <div className='menuWrapper'>
        { !props.trailPage && <SelectTrailType /> }
        { !props.trailPage && <FilterTrails /> }
        { props.trailPage && <div/> }
        <TrailList />
        <GPS />
        <Settings />
      </div>

    </div>
    <style jsx>{`
      .menu {
        position: absolute;
        &.trailMenu {
          position: fixed;
        }
        bottom: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        padding: 1.5rem 0;
        .wrapper {
          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
          justify-items: center;
          position: relative;
          .footerLogos {
            grid-row-start: 2;
          }
          .menuWrapper {
            display: grid;
            grid-template-columns: 1fr 10rem 5rem 5rem 5rem 5rem;
            align-items: center;
            justify-items: center;
          }
        }
      }
      .footerLogos {
        position: relative;
        z-index: 10;
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
      .magenta { background: #d2144b; }
      .orange { background: #ff9100; }
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
            .menuWrapper {
              grid-template-columns: 1fr 28rem repeat(2, 14rem) repeat(2, 6.5rem) 10px;
            }
          }
        }
        .footerLogos {
          img {
            max-width: 150px;
          }
        }
      }
      @media screen and (min-width: 992px) {
        .menu {
          padding: 2.5rem 0;
          .wrapper {
            grid-template-columns: 27% 1fr;
            .footerLogos {
              grid-row-start:1;
            }
            .menuWrapper {
              grid-template-columns: ${!props.trailPage ? '1fr 28rem repeat(2, 14rem) repeat(2, 6.5rem) 10px' : '100% 14rem 6.5rem 6.5rem'};
            }
          }
        }
      }
    `}</style>
  </div>

export default MainMenu
