import Lightbox from 'lightbox-react'

export default class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      isOpen: false,
      loading: true
    };
  }
  componentDidMount() {
    this.setState({loading: false})
  }
  render() {
    const { photoIndex, isOpen } = this.state;
    const images = this.props.images
    const gallery = this.props.images.map(image => {
      return image.url
    })
    return (
      <div>
        {images.map((picture, k) => {
          return (
            <div className="wrapper" key={k}  onClick={() => this.setState({ isOpen: true, photoIndex: k })}>
              { /* {ID, id, title, filename, filesize, url, link, alt, author, description, caption, name, status, uploaded_to, date, modified, menu_order, mime_type, type, subtype, icon, width, height, sizes} */}
              <img src={picture.sizes.medium} alt={picture.alt || picture.title} />
              {picture.description && <p>{picture.description}</p> }
            </div>
          )
        })}
        <div>
          {!this.state.loading && isOpen && (
            <div className="overlay">
              <Lightbox
                mainSrc={gallery[photoIndex]}
                nextSrc={gallery[(photoIndex + 1) % gallery.length]}
                prevSrc={gallery[(photoIndex + gallery.length - 1) % gallery.length]}
                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + gallery.length - 1) % gallery.length,
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % gallery.length,
                  })
                }
              />
            </div>
          )}
        </div>
        <style jsx>{`
          .overlay {
            position: fixed;
            top: 0;
            left:0;
            width: 100%;
            height: 100%;
          }
        `}</style>

      </div>
    );
  }
}