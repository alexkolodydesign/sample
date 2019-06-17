import styled from '@emotion/styled';

const TrailStyles = styled.main`
  @media screen {
    .headerWrapper {
      padding: 0 1em;
    }
    h1 {
      text-transform: uppercase;
      font-size: 3.5rem;
    }
    .trail {
      display: grid;
      grid-template-columns: 100%;
      grid-gap: 3rem;
      .sidebar {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 2;
        grid-row-end: 3;
      }
    }
    .more_trails {
      margin-top: 3rem;
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 3rem;
    }
  }
  @media screen and (min-width: 768px) {
    .trail {
      display: grid;
      grid-template-columns: 30rem minmax(0, 1fr);
      grid-gap: 3rem;
      .sidebar {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1;
        grid-row-end: 2;
      }
    }
    .more_trails {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media print {
    .back_button {
      display: none;
    }

    .trail {
      display:flex;
      flex-direction:column-reverse;
      & > div {
        height:100vh;
      }
      & > div:first-of-type {
        page-break-after: always;
        break-after:always;
      }
    }
    // *,
    // *:before,
    // *:after {
    //   background: #fff !important;
    // }
  }
`;

export default TrailStyles;
