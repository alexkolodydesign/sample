const TrailSidebar = props => {
  const trail = props.data.trail
  return (
    <div className="sidebar">
      <div className="details">
        <div><p>Region<br/><span>{trail.region}</span></p></div>
        <div><p>Available In Season<br/><span>{
          Object.keys(trail.availableSeasons).map( (season) => {
            if (trail.availableSeasons[season] == true) {
              return <span>{season} </span>;
            } else { return null }
          })
        }</span></p></div>
        <div><p>Difficulty</p></div>
        <div><p>Length</p></div>
        <div><p>Trail Traffic</p></div>
        <div><p>Entrance Fee</p></div>
        <div><p>Route Type</p></div>
        <div><p>Highlights</p></div>
        <div><p>Trail Surface</p></div>
        <div><p>Suitability</p></div>
        <div><p>Recommended Use</p></div>
        <div><p>Description</p></div>
        <div className="accessibility">
          <p>Dog</p>
          <p>Handicap</p>
          <p>Bathroom</p>
        </div>
      </div>
      <button>Directions to Trail Head</button>
      <button>Back to Map</button>
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
