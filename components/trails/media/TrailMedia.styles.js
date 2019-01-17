import styled from '@emotion/styled';

const TrailMediaStyles = styled.div`
  @media screen {
    .background_pattern {
      background: #fff;
      background-image: linear-gradient(
          rgba(255, 255, 255, 0.98),
          rgba(255, 255, 255, 0.98)
        ),
        url(/static/images/background-pattern.svg);
      background-position: center;
      background-size: 29rem auto;
      padding-bottom: 3rem;
    }
    h3 {
      text-transform: uppercase;
      margin: 6rem 0 0 0;
      padding-top: 3rem;
      font-size: 2rem;
    }
    .media {
      padding: 0 1rem 9rem;
    }
    .videos,
    .photos {
      text-align: center;
      padding-bottom: 2.75rem;
      grid-column-start: 1;

      hr {
        margin: 1.5rem 0 3rem 0;
      }
      /*
  & > div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2rem;
    & > div {
      width: 100%;
    }
  }
  */
      .wrapper {
        position: relative;
        p {
          margin: 0;
          padding: 8px 0;
          background-color: #666666;
          color: white;
          position: absolute;
          left: 0;
          bottom: -2.75rem;
          z-index: 5;
          width: 100%;
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    .media {
      display: grid;
      grid-template-columns: minmax(50%, 1fr);
      grid-column-gap: 3rem;
      padding-bottom: 12rem;
      h2 {
        grid-column-start: span 2;
      }
      .videos + .photos {
        grid-column-start: 2;
      }
      & > .photos:first-of-type {
        margin: 0 auto;
      }
    }
  }
  @media screen and (min-width: 992px) {
    .media {
      padding: 0 3rem 9rem;
    }
  }
  @media print {
    *,
    *:before,
    *:after {
      display: none;
    }
  }
`;

export default TrailMediaStyles;
