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
    button {
      border: none;
      border-radius: 0.25rem;
      background: #262727;
      padding: 0.5rem 2rem;
      color: #fff;
      font-size: 1.8rem;
      cursor: pointer;
      transition: all 500ms;
      flex: 50%;
      flex-wrap: wrap;
      margin-top: 1.5rem;
      &:hover {
        background: #666666;
      }
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
    *,
    *:before,
    *:after {
      background: #fff !important;
    }
  }
`;

export default TrailStyles;
