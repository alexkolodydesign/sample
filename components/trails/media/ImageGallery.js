import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { pictureShape } from '../../../utils/propTypes';
import ImageGalleryStyles from './ImageGallery.styles';

const Lightbox = dynamic(() =>
  import(/* webpackChunkName: "lightbox-react" */ 'lightbox-react')
);

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
    const gallery = images.map(image => image.url);
    return (
      <ImageGalleryStyles>
        <div>
          {images.map((picture, k) => (
            <button
              type="button"
              className="wrapper"
              style={{ cursor: 'pointer' }}
              key={picture.id}
              onClick={() => this.setState({ isOpen: true, photoIndex: k })}
            >
              {/* {ID, id, title, filename, filesize, url, link, alt, author, description, caption, name, status, uploaded_to, date, modified, menu_order, mime_type, type, subtype, icon, width, height, sizes} */}
              <img src={picture.sizes.medium} alt={picture.alt || trail} />
              {picture.description && <p>{picture.description}</p>}
            </button>
          ))}
        </div>
        <div>
          {!loading && isOpen && (
            <div className="overlay">
              <Head>
                <link
                  rel="stylesheet"
                  type="text/css"
                  href="/static/styles/lightbox.css"
                />
              </Head>
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
      </ImageGalleryStyles>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(pictureShape).isRequired,
  trail: PropTypes.string.isRequired
};
