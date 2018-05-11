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
      <button>Directions to Trail Head</button>
      <button>Back to Trail System</button>
      <style jsx>{`
        .sidebar {
          background: #fff;
          padding: 3rem;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  )
}

export default TrailSidebar
