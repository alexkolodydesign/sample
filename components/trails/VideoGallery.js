import Lightbox from 'lightbox-react'

export default class VideoGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoIndex: 0,
      showImage: true
    };
  }
  componentDidMount() {
    this.setState({loading: false})
  }
  toggle() {
    this.setState({
      showImage: false
    })
  }
  render() {
    var showThumb = {
      display: this.state.showImage ? "block" : "none"
    }

    const { videoIndex, isOpen } = this.state;
    const videos = this.props.videos
    const gallery = this.props.videos.map(video => {
      return video.url
    })
    return (
        <div className='video-wrapper'>
          {videos.map((video, k) => {
            return (
              <div className="video-container" key={k}  onClick={() => this.hide() }>
                { video.thumbnailUrl &&
                  <div className='play-video' style={showThumb} onClick={this.toggle.bind(this)} alt={video.alt || this.props.trail} >
                    <div className='video-thumbnail' style={{ backgroundImage: `url(${video.thumbnailUrl})`}}>
                      <img src="/static/images/play-icon.svg" />
                    </div>
                  </div>
                }
                <iframe ref={`iframe-video`} src={`${video.url}?rel=0`} allow="fullscreen" frameBorder="0" className="video" />
              </div>
            )
          })}
          <style jsx>{`
            .video-wrapper {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-gap: 1rem;
                .video-container {
                  position: relative;
                  iframe {
                    max-width: 100%;
                  }

                  .play-video {
                    position: absolute;
                    z-index: 50;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    .video-thumbnail {
                      position:absolute;
                      left:0;
                      right:0;
                      top: 0;
                      bottom: 0;
                      background-position: center;
                      background-size: cover;

                      img {
                        display: block;
                        width: 70px;
                        position:absolute;
                        top:50%;
                        left:50%;
                        transform: translate(-50%, -50%);
                      }
                    }
                  }
              }
            }
            @media screen and (min-width:768px) {
              .video-wrapper {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  grid-gap: 2rem;
                  .video-container {
                    position: relative;

                    .play-video {
                      position: absolute;
                      z-index: 50;
                      top: 0;
                      right: 0;
                      bottom: 0;
                      left: 0;
                      .video-thumbnail {
                        position:absolute;
                        left:0;
                        right:0;
                        top: 0;
                        bottom: 0;
                        background-position: center;
                        background-size: cover;

                        img {
                          display: block;
                          width: 70px;
                          position:absolute;
                          top:50%;
                          left:50%;
                          transform: translate(-50%, -50%);
                        }
                      }
                    }
                }
              }
            }
          `}</style>

      </div>
    );
  }
}
