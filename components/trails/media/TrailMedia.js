import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { mediaShape } from '../../../utils/propTypes';
import TrailMediaStyles from './TrailMedia.styles';

const ImageGallery = dynamic(
  import(/* webpackChunkName: "ImageGallery" */ './ImageGallery'),
  { ssr: false }
);
const VideoGallery = dynamic(import('./VideoGallery'), { ssr: false });

const TrailMedia = ({ media, trailName }) => (
  <TrailMediaStyles>
    <div className="background_pattern" style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: '0',
          width: '100%',
          height: '1rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)'
        }}
      >
        <div style={{ background: '#d2144b' }} />
        <div style={{ background: '#ff9100' }} />
        <div style={{ background: '#662f8e' }} />
        <div style={{ background: '#00a89c' }} />
      </div>
      <div className="wrapper media">
        {media.videos && (
          <div className="videos">
            <h3>Videos</h3>
            <hr />
            <div>
              <VideoGallery trail={trailName} videos={media.videos} />
            </div>
          </div>
        )}
        {media.pictures && (
          <div className="photos">
            <h3>Pictures</h3>
            <hr />
            <div>
              <ImageGallery trail={trailName} images={media.pictures} />
            </div>
          </div>
        )}
      </div>
    </div>
  </TrailMediaStyles>
);

TrailMedia.propTypes = {
  media: mediaShape.isRequired,
  trailName: PropTypes.string.isRequired
};

export default TrailMedia;
