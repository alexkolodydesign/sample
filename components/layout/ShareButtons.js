import {withRouter} from 'next/router'
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


class ShareButtons extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <FacebookShareButton url={this.props.router.asPath}>
          <FacebookIcon size={32} round={true}/>
        </FacebookShareButton>
        <TwitterShareButton url={this.props.router.asPath}>
          <TwitterIcon size={32} round={true}/>
        </TwitterShareButton>
        <GooglePlusShareButton url={this.props.router.asPath}>
          <GooglePlusIcon size={32} round={true}/>
        </GooglePlusShareButton>
        <LinkedinShareButton url={this.props.router.asPath}>
          <LinkedinIcon size={32} round={true}/>
        </LinkedinShareButton>
        <WhatsappShareButton url={this.props.router.asPath}>
          <WhatsappIcon size={32} round={true}/>
        </WhatsappShareButton>
        <PinterestShareButton url={this.props.router.asPath}>
          <PinterestIcon size={32} round={true}/>
        </PinterestShareButton>
        <RedditShareButton url={this.props.router.asPath}>
          <RedditIcon size={32} round={true}/>
        </RedditShareButton>
        <EmailShareButton url={this.props.router.asPath}>
          <EmailIcon size={32} round={true}/>
        </EmailShareButton>
        <style jsx>{`
          .SocialMediaShareButton {
            float: left;
          }
          `}</style>
        </div>

    )}
}
export default withRouter(ShareButtons)
