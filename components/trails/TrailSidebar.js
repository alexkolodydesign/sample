import ReactHtmlParser from 'react-html-parser'
import sanitizeHtml from 'sanitize-html-react'
import { connect } from 'react-redux'
import Difficulty from '../maps/Difficulty'

// Redux
const mapStateToProps = (state, ownProps) => {
  return {
    metricType: state.map.metricType,
    ...ownProps
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

const TrailSidebar = props => {
  const trail = props.trail.custom_data
  return (
    <div className="sidebar">
      <div className="details background">
        {trail.region &&
          <div><p>Region<br/><span>{trail.region}</span></p></div>
        }

        {trail.difficulty &&
          <div>
            <Difficulty difficulty={trail.difficulty} /><br/>
          </div>

        }

        {trail.length &&
          <React.Fragment>
            {props.metricType === 'imperial' ?
              <div><p>Length<br/><span>{trail.length} mi</span></p></div>
            :
              <div><p>Length<br/><span>{(trail.length * 1.60934).toFixed(2)} km</span></p></div>
            }
          </React.Fragment>
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
          trail.recommendedUse.map( (use, k) => <span key={k}><img className='use-icon' src={`/static/images/menu/${use.value}.svg`} alt={use.label} />{use.label} <br /></span> )
        }</span></p></div>
      }

      {trail.directions &&
        <div className='trail_directions'><p>Directions</p><div className="description">{ReactHtmlParser(sanitizeHtml(trail.directions))}</div></div>
      }

      {props.trail.content && props.trail.content.rendered &&
        <div className='trail_description'><p>Description</p><div className="description">{ReactHtmlParser(sanitizeHtml(props.trail.content.rendered))}</div></div>
      }

      {trail.icons &&
        <div className="trail-general-icons">{trail.icons.map( (icon, k) => <img key={k} src={`/static/images/trail/black-icons/${icon.value}-icon-black.svg`} alt={icon.label} /> )}</div>
      }

      </div>
      <style jsx>{`
        @media screen {
          .background {
            background: #fff;
            background-image: linear-gradient(rgba(255,255,255,0.98),rgba(255,255,255,0.98)),url(/static/images/background-pattern.svg);
            background-position: center;
            background-size: 29rem auto;
            &.details {
              padding: 3rem;
              display: grid;
              grid-template-columns: 1fr 1fr;

              .trail_description {
                grid-column-start: 1;
                grid-column-end: 3;
              }

              // display: flex;
              // flex-direction: column;
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
          .use-icon {
            max-width:30px;
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
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
        }
        @media screen and (min-width: 768px) {
          .background {
            &.details {
              display: block;
            }
          }
        }
        @media print {
          *, *:before, *:after {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailSidebar)
