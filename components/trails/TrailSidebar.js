const TrailSidebar = props => {
  const trail = props.trail
  return (
    <div className="sidebar">
      <div className="details">
        <div><p>Region<br/><span>{trail.region}</span></p></div>
        <div><p>Available In Season<br/><span>{
          Object.keys(trail.availableSeasons).map( (season, k) => {
            if (trail.availableSeasons[season] == true) {
              return <span key={k}>{season} </span>;
            } else { return null }
          })
        }</span></p></div>
        <div><p>Difficulty<br/><span>{trail.difficulty.default}</span></p></div>
        <div><p>Length<br/><span>{trail.length}</span></p></div>
        <div><p>Trail Traffic<br/><span>{trail.trailTraffic}</span></p></div>
        <div><p>Entrance Fee<br/><span>{trail.entranceFee}</span></p></div>
        <div><p>Route Type<br/><span>{trail.routeType}</span></p></div>
        <div><p>Highlights<br/><span>{trail.highlights}</span></p></div>
        <div><p>Trail Surface<br/><span>{trail.trailSurface}</span></p></div>
        <div><p>Suitability<br/><span>{trail.suitability}</span></p></div>
        <div><p>Recommended Use<br/><span>{
          Object.keys(trail.recommendedUse).map( (use, k) => {
            if (trail.recommendedUse[use] == true) {
              return <span key={k}>{use} </span>;
            } else { return null }
          })
        }</span></p></div>
        <div><p>Description<br/><span>{trail.description}</span></p></div>
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
