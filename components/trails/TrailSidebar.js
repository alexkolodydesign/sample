import ReactHtmlParser from 'react-html-parser'
import sanitizeHtml from 'sanitize-html-react'

const TrailSidebar = props => {
  const trail = props.trail.custom_data
  return (
    <div className="sidebar">
      <div className="details background">
        {trail.region &&
          <div><p>Region<br/><span>{trail.region}</span></p></div>
        }

        {trail.difficulty && trail.difficulty.defaultDifficulty &&
          <div><p>Difficulty<br/><span>{trail.difficulty.defaultDifficulty.label}</span></p></div>
        }

        {trail.length &&
          <div><p>Length<br/><span>{trail.length}</span></p></div>
        }

        {trail.trailTraffic &&
          <div><p>Trail Traffic<br/><span>{trail.trailTraffic.label}</span></p></div>
        }

        {trail.entranceFee &&
          <div><p>Entrance Fee<br/><span>{trail.entranceFee}</span></p></div>
        }

        {trail.routeType &&
          <div><p>Route Type<br/><span>{trail.routeType.label}</span></p></div>
        }

        {trail.highlights &&
          <div><p>Highlights<br/>
            {trail.highlights.map((highlight, k) => <span key={k}>{highlight.label}<br /></span>)}
          </p></div>
        }

        {trail.trailSurface &&
          <div><p>Trail Surface<br/><span>{trail.trailSurface}</span></p></div>
        }

        {trail.accessibility &&
          <div className="accessibility"><p>Accessibility<br/>{
            trail.accessibility.map( (thing, k) => {
              if (trail.accessibility) {
                return <span key={k}>{thing.label} <br /></span>
              } else { return null }
            })
          }</p></div>
        }

      {trail.suitability &&
        <div className="suitability"><p>Suitability<br/>{
          trail.suitability.map( (thing, k) => {
            if (trail.suitability) {
              return <span key={k}>{thing.label} </span>
            } else { return null }
          })
        }</p></div>
      }

      {trail.recommendedUse &&
        <div><p>Recommended Use<br/><span>{
          trail.recommendedUse.map( (use, k) => <span key={k}>{use.label} <br /></span> )
        }</span></p></div>
      }

      {props.trail.content && props.trail.content.rendered &&
        <div><p>Description</p><div className="description">{ReactHtmlParser(sanitizeHtml(props.trail.content.rendered))}</div></div>
      }

      {trail.icons &&
        <div className="trail-general-icons">{trail.icons.map( (icon, k) => <img src={`/static/images/trail/black-icons/${icon.value}-icon-black.svg`} alt={icon.label} /> )}</div>
      }

      </div>
      <style jsx>{`
        .background {
          background: #fff;
          background-image: linear-gradient(rgba(255,255,255,0.98),rgba(255,255,255,0.98)),url(/static/images/background-pattern.svg);
          background-position: center;
          background-size: 29rem auto;
          &.details {
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
        .trail-general-icons {
          img {
            max-width: 40px;
            display: inline-block;
            margin-right: 5px;
          }
        }
      `}</style>
    </div>
  )
}

export default TrailSidebar
