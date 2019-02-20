import styled from '@emotion/styled';

const RegionTrailInfoStyles = styled.div`
  .top {
    background: #3fa9f5;
    color: white;
    text-align: center;
    display: block;
    padding: 1rem 0.75rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    transition: all 500ms;
    h3 {
      padding: 0;
      margin: 0;
    }

    &:hover {
      color: white;
      background: #3a95d6;
      transition: all 500ms;
    }
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
  width: 100%;
  overflow-x: hidden;
  .image {
    img {
      max-height: 150px;
    }
  }
  .icons {
    padding-top: 1rem;
  }
  a {
    text-decoration: none;
    color: #3fa9f5;
    font-weight: bold;
    padding: 3px 0 0;
    cursor: pointer;
    display: inline-block;
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
    display: flex;
    img {
      max-width: 3.5rem;
      max-height: 3.5rem;
      margin-right: 1rem;
      flex: 1 1 auto;
    }
  }

  @media screen and (min-width: 768px) {
    min-width: 205px;
    width: 100%;
    .image {
      img {
        padding: 0.5rem 0;
        max-width: 100%;
        height: auto;
      }
    }
  }
`;

export default RegionTrailInfoStyles;
