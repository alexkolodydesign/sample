import Link from 'next/link'

const TrailSystemGuide = props =>
  <div className="systems">
    <div>
      <Link href="/trail-systems/trailsystem" as="/trail-systems/zion-national-park">
        <a className={props.system == "zion-national-park" ? "active" : null}>
          Zion National Park
        </a>
      </Link>
    </div>
    <div>
      <Link href="/trail-systems/trailsystem" as="/trail-systems/snow-canyon-state-park">
        <a className={props.system == "snow-canyon-state-park" ? "active" : null}>
          Snow Canyon State Park
        </a>
      </Link>
    </div>
    <div>
      <Link href="/trail-systems/trailsystem" as="/trail-systems/gooseberry-mesa">
        <a className={props.system == "gooseberry-mesa" ? "active" : null}>
          Gooseberry Mesa
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
        background: #aaa;
        padding: 0.5rem 0;
        width: 25rem;
        text-align: center;
        color: #fff;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 500ms;
        position: relative;
        display: block;
        &:hover {
          background: #262727;
        }
        &.active {
          background: #3fa9f5;
          &:hover {
            background: #0d93f2;
          }
        }
      }
    `}</style>
  </div>

export default TrailSystemGuide
