const TrailMedia = props =>
<div>
  <div className="background_pattern" style={{position: "relative"}}>
    <div style={{position: "absolute", top: "0", width: "100%", height: "1rem", display: "grid", gridTemplateColumns: "repeat(4, 1fr)"}}>
      <div style={{background: "#ec1e79"}}></div>
      <div style={{background: "#ff5a00"}}></div>
      <div style={{background: "#662f8e"}}></div>
      <div style={{background: "#00a89c"}}></div>
    </div>
    <div className="wrapper media">
      {props.media.videos &&
        <div className="videos">
          <h3>Videos</h3>
          <hr/>
          <div>
            {props.media.videos.map((video, k) => {
              return <div key={k}></div>
            })}
          </div>
        </div>
      }
      {props.media.pictures &&
        <div className="photos">
          <h3>Pictures</h3>
          <hr/>
          <div>
            {props.media.pictures.map((picture, k) => {
              return <div  key={k}></div>
            })}
          </div>
        </div>
      }

    </div>
  </div>
  <style jsx>{`
      .background_pattern {
        background: #fff;
        background-image: linear-gradient(rgba(255,255,255,0.95),rgba(255,255,255,0.95)),url(/static/images/background-pattern.svg);
        background-position: center;
        background-size: 29rem auto;
        padding-bottom: 3rem;
      }
      h3 {
        text-transform: uppercase;
        margin: 6rem 0 0 0;
        font-size: 2rem;
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
        hr {margin: 1.5rem 0 3rem 0;}
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
