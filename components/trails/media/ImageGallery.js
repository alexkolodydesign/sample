import React from 'react';
import dynamic from 'next/dynamic';

const Lightbox = dynamic(() => import('lightbox-react'));

export default class ImageGallery extends React.Component {
  state = {
    photoIndex: 0,
    isOpen: false,
    loading: true
  };

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    const { photoIndex, isOpen, loading } = this.state;
    const { images, trail } = this.props;
    const gallery = images.map(image => {
      return image.url;
    });
    return (
      <div className="gallery-wrapper">
        <div>
          {images.map((picture, k) => {
            return (
              <div
                className="wrapper"
                style={{ cursor: 'pointer' }}
                key={picture.id}
                onClick={() => this.setState({ isOpen: true, photoIndex: k })}
              >
                {/* {ID, id, title, filename, filesize, url, link, alt, author, description, caption, name, status, uploaded_to, date, modified, menu_order, mime_type, type, subtype, icon, width, height, sizes} */}
                <img src={picture.sizes.medium} alt={picture.alt || trail} />
                <p>{picture.description}</p>
              </div>
            );
          })}
        </div>
        <div>
          {!loading && isOpen && (
            <div className="overlay">
              <Lightbox
                mainSrc={gallery[photoIndex]}
                nextSrc={gallery[(photoIndex + 1) % gallery.length]}
                prevSrc={gallery[(photoIndex + gallery.length - 1) % gallery.length]}
                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + gallery.length - 1) % gallery.length
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % gallery.length
                  })
                }
              />
            </div>
          )}
        </div>
        <style jsx>
          {`
            .gallery-wrapper {
              & > div {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-gap: 1rem;
                & > div {
                  width: 100%;
                  position: relative;
                  img {
                    max-width: 100%;
                  }
                  p {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: 0;
                    padding: 10px;
                    color: #e4e4e4;
                    background: #464646;
                    font-size: 12px;
                  }
                }
              }
            }
            @media screen and (min-width: 768px) {
              .gallery-wrapper {
                & > div {
                  display: grid;
                  grid-template-columns: 1fr 1fr 1fr;
                  grid-gap: 2rem;
                  & > div {
                    width: 100%;
                    position: relative;
                    p {
                      position: absolute;
                      bottom: 0;
                      left: 0;
                      right: 0;
                      margin: 0;
                      padding: 10px;
                      color: #e4e4e4;
                      background: #464646;
                      font-size: 12px;
                    }
                  }
                }
              }
            }
            .overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
          `}
        </style>
      </div>
    );
  }
}
