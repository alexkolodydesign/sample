const TrailSidebar = props =>
  <div className="sidebar">
    <div className="details">
      <p>Region</p>
      <p>Available In Season</p>
      <p>Difficulty</p>
      <p>Length</p>
      <p>Trail Traffic</p>
      <p>Entrance Fee</p>
      <p>Route Type</p>
      <p>Highlights</p>
      <p>Trail Surface</p>
      <p>Suitability</p>
      <p>Recommended Use</p>
      <p>Description</p>
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

export default TrailSidebar
