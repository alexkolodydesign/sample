import styled from '@emotion/styled';

const RegionTrailInfoStyles = styled.div`
  h3 {
    padding: 0 0 6px;
    color: #777;
    border-bottom: 1px solid #ccc;
  }
  p {
    font-weight: bold;
    margin: 0 0 1rem;
    color: #777;
    span {
      font-weight: normal;
    }
    &:last-of-type {
      margin-bottom: 10px;
    }
  }
  min-height: 250px;
  width: 100%;
  overflow-x: hidden;
  .image {
    img {
      max-height: 150px;
    }
  }
  .icons {
    padding-top: 2em;
  }
  a {
    text-decoration: none;
    color: #3fa9f5;
    font-weight: bold;
    padding: 3px 0 0;
    &:hover {
      text-decoration: none;
      color: #000;
    }
  }
  .gm-style .gm-style-iw {
    left: 10px;
    top: 5px;
  }
  .trail_type {
    display: grid;
    grid-template: 2.5rem 2.5rem / 2.5rem 2.5rem;
    align-self: center;
    img {
      width: 3.5rem;
    }
  }

  @media screen and (min-width: 768px) {
    display: grid;
    height: 100%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 10% 45% 45%;
    grid-template-areas: 'top top top' 'info info info' 'image image icons';
    min-width: 300px;
    min-height: 250px;
    width: 100%;
    .top {
      grid-area: top;
      margin: 0;
    }
    .info {
      grid-area: info;
      padding-top: 1rem;
    }
    .image {
      grid-area: image;
      img {
        padding: 1.5rem 0;
        max-width: 140px;
        height: auto;
      }
    }
    .icons {
      padding-top: 1rem;
      grid-area: icons;
    }
  }
`;

export default RegionTrailInfoStyles;
