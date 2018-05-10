import Link from 'next/link'

const TrailSystemGuide = props =>
  <div>
    <Link href="/trail-systems/trailsystem" as="/trail-systems/zion-national-park"><a>Zion National Park</a></Link>
    <Link href="/trail-systems/trailsystem" as="/trail-systems/snow-canyon-state-park"><a>Snow Canyon State Park</a></Link>
    <Link href="/trail-systems/trailsystem" as="/trail-systems/gooseberry-mesa"><a>Gooseberry Mesa</a></Link>
    <style jsx>{`
      div {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        display: flex;
      }

      a {
        text-decoration: none;
        border: none;
        background: #4d4e4e;
        padding: 1.5rem 3rem;
        color: #fff;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 500ms;
        &:first-child {
          border-top-left-radius: 2rem;
          border-bottom-left-radius: 2rem;
        }
        &:hover {
          background: #262727;
        }
      }
    `}</style>
  </div>

export default TrailSystemGuide
