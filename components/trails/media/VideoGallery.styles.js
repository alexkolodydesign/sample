import styled from '@emotion/styled';

const VideoGalleryStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  .video-container {
    position: relative;
    background: transparent;
    border: none;
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
  @media screen and (min-width: 768px) {
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
`;

export default VideoGalleryStyles;
