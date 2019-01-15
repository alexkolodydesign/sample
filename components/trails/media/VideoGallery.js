import React from 'react';
import PropTypes from 'prop-types';

export default class VideoGallery extends React.Component {
  state = {
    showImage: true
  };

  toggle = () => {
    this.setState({
      showImage: false
    });
  };

  render() {
    const { videos, trail } = this.props;
    const { showImage } = this.state;
    const showThumb = {
      display: showImage ? 'block' : 'none'
    };
    return (
      <div className="video-wrapper">
        {videos.map(video => (
          <button
            className="video-container"
            key={video.url}
            onClick={() => this.hide()}
            type="button"
          >
            {video.thumbnailUrl && (
              <button
                type="button"
                className="play-video"
                style={showThumb}
                onClick={this.toggle.bind(this)}
                alt={video.alt || trail}
              >
                <div
                  className="video-thumbnail"
                  style={{ backgroundImage: `url(${video.thumbnailUrl})` }}
                >
                  <img src="/static/images/play-icon.svg" alt="play" />
                </div>
              </button>
            )}
            <iframe
              title={video.url}
              src={`${video.url}?rel=0`}
              allow="fullscreen"
              frameBorder="0"
              className="video"
            />
          </button>
        ))}
        <style jsx>
          {`
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
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    background-position: center;
                    background-size: cover;

                    img {
                      display: block;
                      width: 70px;
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                    }
                  }
                }
              }
            }
            @media screen and (min-width: 768px) {
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
                      position: absolute;
                      left: 0;
                      right: 0;
                      top: 0;
                      bottom: 0;
                      background-position: center;
                      background-size: cover;

                      img {
                        display: block;
                        width: 70px;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                      }
                    }
                  }
                }
              }
            }
          `}
        </style>
      </div>
    );
  }
}

VideoGallery.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  trail: PropTypes.string.isRequired
};
