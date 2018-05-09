const TrailMedia = props =>
  <div className="wrapper media">
    <h2>Trail Media</h2>
    <div className="videos">
      <h3>Videos</h3>
      <hr/>
    </div>
    <div className="photos">
      <h3>Pictures</h3>
      <hr/>
    </div>
    <style jsx>{`
      .media {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 3rem;
        h2 {
          grid-column-start: span 2;
        }
      }
    `}</style>
  </div>

export default TrailMedia
