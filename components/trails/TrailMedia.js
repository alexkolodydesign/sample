const TrailMedia = props =>
  <div className="wrapper media">
    <h2>Trail Media</h2>
    <div className="videos">
      <h3>Videos</h3>
      <hr/>
      <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div className="photos">
      <h3>Pictures</h3>
      <hr/>
      <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <style jsx>{`
      h3 {
        text-transform: uppercase;
      }

      .media {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 3rem;
        h2 {
          grid-column-start: span 2;
        }
      }

      .videos, .photos {
        text-align: center;
        hr {margin: 3rem 0 1.5rem 0;}
        & > div {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 3rem;
          & > div {
            background: #ccc;
            height: 10rem;
            width: 100%;
          }
        }
      }
    `}</style>
  </div>

export default TrailMedia
