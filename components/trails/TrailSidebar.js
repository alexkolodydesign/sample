import ReactHtmlParser from 'react-html-parser'
import sanitizeHtml from 'sanitize-html-react'

const TrailSidebar = props => {
  const trail = props.trail.custom_data
  return (
    <div className="sidebar">
      <div className="details">
        <div><p>Region<br/><span>{trail.region}</span></p></div>
        <div><p>Difficulty<br/><span>{trail.difficulty.defaultDifficulty.label}</span></p></div>
        <div><p>Length<br/><span>{trail.length}</span></p></div>
        <div><p>Trail Traffic<br/><span>{trail.trailTraffic.label}</span></p></div>
        <div><p>Entrance Fee<br/><span>{trail.entranceFee}</span></p></div>
        <div><p>Route Type<br/><span>{trail.routeType.label}</span></p></div>
        <div><p>Highlights<br/>
          {trail.highlights.map((highlight, k) => <span key={k}>{highlight.label}</span>)}
        </p></div>
        <div><p>Trail Surface<br/><span>{trail.trailSurface}</span></p></div>
        <div><p>Suitability<br/>
          {trail.suitability.map((thing, k) => <span key={k}>{thing.label}</span>)}
        </p></div>
        <div><p>Recommended Use<br/><span>{
          trail.recommendedUse.map( (use, k) => <span key={k}>{use.label} </span> )
        }</span></p></div>
        <div><p>Description</p><div className="description">{ReactHtmlParser(sanitizeHtml(props.trail.content.rendered))}</div></div>
        <div className="accessibility">{
          Object.keys(trail.accessability).map( (thing, k) => {
            if (trail.accessability[thing] == true) {
              return <span key={k}>{thing} </span>;
            } else { return null }
          })
        }</div>
      </div>
      <div className="buttons">
        <button>Directions to Trail Head</button>
        <button>Back to Trail System</button>
      </div>
      <style jsx>{`
        .details {
          background: #fff;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          p {
            margin: 0 0 2rem 0;
            text-transform: uppercase;
            font-weight: 500;
            span {
              font-weight: 100;
              text-transform: initial;
            }
          }
        }
        .description {
          font-weight: 100;
        }
        .buttons {
          margin-top: 3rem;
        }
        button {
          border: none;
          width: 100%;
          margin-bottom: 1.5rem;
          padding: 1.5rem 3rem;
          color: #fff;
          font-size: 1.8rem;
          cursor: pointer;
          transition: all 500ms;
          background: #4D4E4E;
          &:hover {
            background: #262727;
          }
          &:first-child {
            background: #3fa9f5;
            &:hover {
              background: #0d93f2;
            }
          }
        }
      `}</style>
    </div>
  )
}

export default TrailSidebar
