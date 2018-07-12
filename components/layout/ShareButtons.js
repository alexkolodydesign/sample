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
      <div className="share-buttons-wrapper">
      {console.log(this.props.router)}
        <div className="sub-wrapper">
          <FacebookShareButton className="share-button" url={this.props.router.asPath}>
            <FacebookIcon size={32} round={true}/>
          </FacebookShareButton>
          <TwitterShareButton className="share-button" url={this.props.router.asPath}>
            <TwitterIcon size={32} round={true}/>
          </TwitterShareButton>
        </div>
        <GooglePlusShareButton className="share-button" url={this.props.router.asPath}>
          <GooglePlusIcon size={32} round={true}/>
        </GooglePlusShareButton>
        <LinkedinShareButton className="share-button" url={this.props.router.asPath}>
          <LinkedinIcon size={32} round={true}/>
        </LinkedinShareButton>
        <WhatsappShareButton className="share-button" url={this.props.router.asPath}>
          <WhatsappIcon size={32} round={true}/>
        </WhatsappShareButton>
        <PinterestShareButton className="share-button" url={this.props.router.asPath}>
          <PinterestIcon size={32} round={true}/>
        </PinterestShareButton>
        <RedditShareButton className="share-button" url={this.props.router.asPath}>
          <RedditIcon size={32} round={true}/>
        </RedditShareButton>
        <EmailShareButton className="share-button" url={this.props.router.asPath}>
          <EmailIcon size={32} round={true}/>
        </EmailShareButton>
        <style jsx>{`
          .share-buttons-wrapper {
            display: block;
            .share-button {
              float: left;
            }
          }
          .sub-wrapper > * {
            float: left;
          }
          `}
        </style>
      </div>

    )}
}
export default withRouter(ShareButtons)
