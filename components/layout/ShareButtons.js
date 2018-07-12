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
} from 'react-share'
import PropTypes from 'prop-types'

// Use pure functional components unless you need access to the react life-cycle methods or state (componentDidMount, componentWillUnmount, ect…)
// These are lighter in performance, and fit into popular conventions on how to split out react applications
const ShareButtons = props => {
  const url = window.location.href
  return (
    <div className="social">
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round={true}/>
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={32} round={true}/>
      </TwitterShareButton>
      <GooglePlusShareButton url={url}>
        <GooglePlusIcon size={32} round={true}/>
      </GooglePlusShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round={true}/>
      </LinkedinShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={32} round={true}/>
      </WhatsappShareButton>
      {/* Pinterest Requires an Absolute URL for Image to Pin */}
      <PinterestShareButton url={url} media={props.media}>
        <PinterestIcon size={32} round={true}/>
      </PinterestShareButton>
      <RedditShareButton url={url}>
        <RedditIcon size={32} round={true}/>
      </RedditShareButton>
      <EmailShareButton url={url}>
        <EmailIcon size={32} round={true}/>
      </EmailShareButton>
      <style jsx>{`
        .social {
          display: flex;
        }
      `}</style>
      {/* Sometimes when you can't get inside the html to apply styles you can use a global style to force it. Generally stay away from these as it won't be namespaced and could interfere if there are other classes with the same name on the same page */}
      <style jsx global>{`
        .SocialMediaShareButton {
          padding-right: 1rem;
        }
      `}</style>
    </div>
  )
}

{/* Give some default props for pinterest image, if you want to change the image for each trail, pass the prop down from where you are calling the ShareButtons component */}
ShareButtons.defaultProps = {
  media: "https://cdn.visitstgeorge.com/wp-content/uploads/2015/03/Springdale-Pano.jpg"
};

export default ShareButtons
