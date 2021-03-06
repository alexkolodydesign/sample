import styled from '@emotion/styled';

const MainMenuStyles = styled.div`
  position: ${({ trailPage }) => (trailPage ? 'fixed' : 'absolute')};
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  padding: 1.5rem 0;
  .wrapper {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-items: center;
    justify-items: center;
    position: relative;
    .footerLogos {
      grid-row-start: 2;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      width: 100%;
      align-items: center;
      justify-items: center;
      margin-top: 10px;
      position: relative;
      z-index: 10;
      img {
        max-height: 60px;
        max-width: 100%;
      }
      .lifeLogo {
        grid-column-start: 1;
      }
    }
    .menuWrapper {
      display: grid;
      ${({ trailPage }) =>
        !trailPage
          ? 'grid-template-columns: 1fr 5rem 5rem 5rem 5rem 1rem; width: 100%'
          : 'grid-template-columns: 0 repeat(3,6.5rem); width: auto;'
        };
      align-items: center;
      justify-items: center;
    }
  }
  .colors {
    position: absolute;
    top: 0;
    width: 100%;
    height: 1rem;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .magenta {
    background: #d2144b;
  }
  .orange {
    background: #ff9100;
  }
  .purple {
    background: #662f8e;
  }
  .aqua {
    background: #00a89c;
  }
  .background {
    position: absolute;
    top: 1rem;
    width: 100%;
    height: calc(100% - 1rem);
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.98),
        rgba(255, 255, 255, 0.98)
      ),
      url(/static/images/background-pattern.svg);
    background-position: center;
    background-size: 29rem auto;
  }

  @media screen and (min-width: 533px) {
    .wrapper {
      grid-template-columns: 22rem 1fr;
      padding: 0 1rem;
      .footerLogos {
        grid-row-start: 1;
        img {
          margin-right: 10px;
        }
      }
      .menuWrapper {
        grid-template-columns: ${({ trailPage }) =>
          !trailPage
            ? '1fr 5rem 5rem 5rem 5rem;'
            : 'repeat(4,6.5rem)'};
      }
    }
  }
  @media screen and (min-width: 768px) {
    padding: 2rem 0;
    .wrapper {
      .menuWrapper {
        grid-template-columns: ${({ trailPage }) =>
          !trailPage
            ? '1fr repeat(2, 11rem) repeat(2, 5rem);'
            : '0 14rem 6.5rem 6.5rem'};
      }
    }
  }
  @media screen and (min-width: 870px) {
    .wrapper {
      .menuWrapper {
        grid-template-columns: ${({ trailPage }) =>
          !trailPage
            ? '1fr repeat(2, 12rem) repeat(2, 6rem);'
            : '0 14rem 6.5rem 6.5rem'};
      }
    }
  }
  @media screen and (min-width: 992px) {
    padding: 2.5rem 0;
    .wrapper {
      grid-template-columns: 27% minmax(0, 1fr);
      padding: 0 3rem;
      .footerLogos {
        width: 100%;
        grid-row-start: 1;
        display: block;
        margin-top: 0;
        img {
          max-width: 48%;
          &.lifeLogo {
            margin-right: 4%;
          }
        }
      }
      .menuWrapper {
        width: 100%;
        grid-template-columns: ${({ trailPage }) =>
          !trailPage
            ? '1fr repeat(2, 14rem) repeat(2, 6.5rem)'
            : '1fr 14rem 6.5rem 6.5rem'};
      }
    }
  }
  @media screen and (min-width: 1140px) {
    .wrapper {
      grid-template-columns: 33% minmax(0, 1fr);
    }
  }
  @media print {
    *,
    *:before,
    *:after {
      background: #ffffff;
    }
    .wrapper {
      .menuWrapper {
        display: none;
      }
    }
  }
`;

export default MainMenuStyles;
