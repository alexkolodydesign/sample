import Link from 'next/link'

const TrailSystemGuide = props =>
  <div className="systems">
    <div>
      <Link href="/trail-systems/trailsystem" as="/trail-systems/zion-national-park">
        <a className={props.system == "zion-national-park" ? "active" : null}>
          Zion <span>National Park</span>
        </a>
      </Link>
    </div>
    <div>
      <Link href="/trail-systems/trailsystem" as="/trail-systems/snow-canyon-state-park">
        <a className={props.system == "snow-canyon-state-park" ? "active" : null}>
          Snow Canyon <span>State Park</span>
        </a>
      </Link>
    </div>
    <div>
      <Link href="/trail-systems/trailsystem" as="/trail-systems/gooseberry-mesa">
        <a className={props.system == "gooseberry-mesa" ? "active" : null}>
          Gooseberry <span>Mesa</span>
        </a>
      </Link>
    </div>
    <style jsx>{`
      .systems {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 2;
        display: flex;
        align-items: stretch;
        justify-content: space-evenly;
        & > div {
          flex: 1;
          &:nth-child(2) a {
            border-left: 1px solid #959595;
            border-right: 1px solid #959595;
          }
        }
      }

      a {
        text-decoration: none;
        border: none;
        background: #aaa;
        padding: 0.5rem;
        height: calc(100% - 1rem);
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

        span {
          display: none;
        }
      }
      @media screen and (min-width: 992px) {
        .systems {
          left: initial;
          & > div {
            flex: 1;
            &:first-child a {
              border-top-left-radius: 2rem;
              border-bottom-left-radius: 2rem;
            }
          }
        }
        a {
          width: 25rem;
          span {
            display: inline-block;
          }
        }
      }
    `}</style>
  </div>

export default TrailSystemGuide
