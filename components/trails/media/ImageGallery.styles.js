import styled from '@emotion/styled';

const ImageGalleryStyles = styled.div`
  button {
    border: none;
    background: none;
  }
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
`;

export default ImageGalleryStyles;
