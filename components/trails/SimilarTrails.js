const SimilarTrails = props =>
  <div className="container">
    <h2>Similar to This Trail:</h2>
    <div className="similar_trails">
      <div className="trail">
        {props.similarTrails.map((trail, k) => {
          return (
            <div key={k}>
              {trail.title}
              {trail.length}
              {trail.highlights}
              {trail.difficulty.default}
              {trail.region}
            </div>
          )
        })}
      </div>
    </div>
    <style jsx>{`
      .container {
        padding: 1.5rem 3rem 3rem 3rem;
        background: #fff;
      }
      .similar_trails {
        height: 15rem;
        overflow-y: scroll;
        background: #e6e6e6;
      }
      h2 {
        text-transform: uppercase;
        margin: 0.25rem 0;
      }
    `}</style>
  </div>

export default SimilarTrails
