import dynamic from 'next/dynamic'

const ImageGallery = dynamic(
  import('./ImageGallery'), {
  ssr: false
})

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
            <ImageGallery images={props.media.pictures} />
          </div>
        </div>
      }

    </div>
  </div>
  <style jsx>{`
    .background_pattern {
      background: #fff;
      background-image: linear-gradient(rgba(255,255,255,0.98),rgba(255,255,255,0.98)),url(/static/images/background-pattern.svg);
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
      padding-bottom: 2.75rem;
      hr {margin: 1.5rem 0 3rem 0;}
      /*
      & > div {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 2rem;
        & > div {
          width: 100%;
        }
      }
      */
      .wrapper {
        position: relative;
        p {
          margin: 0;
          padding: 8px 0;
          background-color: #666666;
          color: white;
          position: absolute;
          left: 0;
          bottom: -2.75rem;
          z-index: 5;
          width: 100%;
        }
      }
      img.preview {
        max-width: 100%;
        height: auto;
      }
    }
  `}</style>
</div>

export default TrailMedia
