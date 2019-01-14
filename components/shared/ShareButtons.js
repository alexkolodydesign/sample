import React from 'react';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  GooglePlusIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  EmailIcon
} from 'react-share';
import PropTypes from 'prop-types';

const ShareButtons = ({ media }) => {
  const url = window.location.href;
  return (
    <div className="social">
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <GooglePlusShareButton url={url}>
        <GooglePlusIcon size={32} round />
      </GooglePlusShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      {/* Pinterest Requires an Absolute URL for Image to Pin */}
      <PinterestShareButton url={url} media={media}>
        <PinterestIcon size={32} round />
      </PinterestShareButton>
      <RedditShareButton url={url}>
        <RedditIcon size={32} round />
      </RedditShareButton>
      <EmailShareButton url={url}>
        <EmailIcon size={32} round />
      </EmailShareButton>
      <style jsx>
        {`
          .social {
            display: flex;
          }
        `}
      </style>
      <style jsx global>
        {`
          .SocialMediaShareButton {
            padding-right: 1rem;
          }
        `}
      </style>
    </div>
  );
};

ShareButtons.propTypes = {
  media: PropTypes.string
};

ShareButtons.defaultProps = {
  media: 'https://cdn.visitstgeorge.com/wp-content/uploads/2015/03/Springdale-Pano.jpg'
};

export default ShareButtons;
