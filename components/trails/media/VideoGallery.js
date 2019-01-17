import React from 'react';
import PropTypes from 'prop-types';
import VideoGalleryStyles from './VideoGallery.styles';

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
      <VideoGalleryStyles className="video-wrapper">
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
      </VideoGalleryStyles>
    );
  }
}

VideoGallery.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  trail: PropTypes.string.isRequired
};
