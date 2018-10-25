import dynamic from 'next/dynamic'

const ImageGallery = dynamic(
  import('./ImageGallery'), {
  ssr: false
})

const VideoGallery = dynamic(
  import('./VideoGallery'), {
  ssr: false
})

const TrailMedia = props =>
<div>
  <div className="background_pattern" style={{position: "relative"}}>
    <div style={{position: "absolute", top: "0", width: "100%", height: "1rem", display: "grid", gridTemplateColumns: "repeat(4, 1fr)"}}>
      <div style={{background: "#ec1e79"}}></div>
      <div style={{background: "#ff9100"}}></div>
      <div style={{background: "#662f8e"}}></div>
      <div style={{background: "#00a89c"}}></div>
    </div>
    <div className="wrapper media">
      {props.media.videos &&
        <div className="videos">
          <h3>Videos</h3>
          <hr/>
          <div>
            <VideoGallery trail={props.trail} videos={props.media.videos} />
            {
              /*props.media.videos.map((video, k) => {
              return <div key={k}>Video</div>
            })
            */}
          </div>
        </div>
      }
      {props.media.pictures &&
        <div className="photos">
          <h3>Pictures</h3>
          <hr/>
          <div>
            <ImageGallery trail={props.trail} images={props.media.pictures} />
          </div>
        </div>
      }

    </div>
  </div>
  <style jsx>{`
    @media screen {
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
        padding-top:3rem;
        font-size: 2rem;
      }
      .media {
        padding: 0 1rem 9rem;
      }
      .videos, .photos {
        text-align: center;
        padding-bottom: 2.75rem;
        grid-column-start: 1;

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
      }
    }

    @media screen and (min-width:768px) {

      .media {
        display: grid;
        grid-template-columns: minmax(50%, 1fr);
        grid-column-gap: 3rem;
        padding-bottom: 12rem;
        h2 {
          grid-column-start: span 2;
        }
        .videos + .photos {
          grid-column-start:2;
        }
        & > .photos:first-child {
          margin: 0 auto;
        }
      }
    }
    @media screen and (min-width: 992px) {
      .media {
        padding: 0 3rem 9rem;
      }
    }
    @media print {
      *, *:before, *:after {
        display: none;
      }
    }
  `}</style>
</div>

export default TrailMedia
