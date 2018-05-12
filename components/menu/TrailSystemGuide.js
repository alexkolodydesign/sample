import Link from 'next/link'

const TrailSystemGuide = props =>
  <div className="systems">
    <div>
      <Link href="/trail-systems/trailsystem" as="/trail-systems/zion-national-park">
        <a className={props.system == "zion-national-park" ? "active" : null}>
          Zion National Park
          <div className="dropdown">
            <div className="background"></div>
            <p>View Trail System</p>
          </div>
        </a>
      </Link>
    </div>
    <div>
      <Link href="/trail-systems/trailsystem" as="/trail-systems/snow-canyon-state-park">
        <a className={props.system == "snow-canyon-state-park" ? "active" : null}>
          Snow Canyon State Park
          <div className="dropdown">
            <div className="background"></div>
            <p>View Trail System</p>
          </div>
        </a>
      </Link>
    </div>
    <div>
      <Link href="/trail-systems/trailsystem" as="/trail-systems/gooseberry-mesa">
        <a className={props.system == "gooseberry-mesa" ? "active" : null}>
          Gooseberry Mesa
          <div className="dropdown">
            <div className="background"></div>
            <p>View Trail System</p>
          </div>
        </a>
      </Link>
    </div>
    <style jsx>{`
      .systems {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        display: flex;
        & > div:first-child a {
          border-top-left-radius: 2rem;
          border-bottom-left-radius: 2rem;
        }
      }

      a {
        text-decoration: none;
        border: none;
        background: #4d4e4e;
        padding: 1rem 6rem;
        color: #fff;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 500ms;
        position: relative;
        display: block;
        &:hover {
          background: #262727;
          .dropdown {
            transform: translateY(0);
            background: #262727;
            .background {
              background-size: 110% auto;
            }
          }
        }
        &.active {
          background: #3fa9f5;
          &:hover {
            background: #0d93f2;
            .dropdown {
              background: #0d93f2;
            }
          }
          .dropdown {
            background: #3fa9f5;
          }
        }
        .dropdown {
          position: absolute;
          left: 0;
          top: 2rem;
          z-index: -1;
          width: 100%;
          background: #4d4e4e;
          padding: 2rem 1.5rem 0rem 1.5rem;
          text-align: center;
          box-sizing: border-box;
          transition: all 500ms;
          transform: translateY(-100%);
          .background {
            max-width: 100%;
            height: 15rem;
            background-image: url(https://placehold.it/300x150);
            background-size: 100% auto;
            background-position: center;
            transition: all 1000ms;
          }
        }
      }
    `}</style>
  </div>

export default TrailSystemGuide
