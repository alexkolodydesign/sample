import styled from '@emotion/styled';

const ElevationChartStyles = styled.div`
  h2 {
    margin: 3rem 0rem 1.5rem 0rem;
  }
  .chart {
    background: #eee;
    padding: 1.5rem 0;
    width: 100%;
  }
  .details {
    display: grid;
    grid-template-columns: 1fr 11rem;
    margin-top: 3rem;
  }
  .stats {
    p {
      font-weight: 700;
      span {
        padding-left: 1rem;
        font-weight: 100;
      }
    }
  }
  .map_type {
    display: grid;
    grid-template: repeat(2, 6rem) / repeat(2, 6rem);
    img {
      width: 5rem;
    }
  }
  .recharts-surface {
    overflow-y: visible;
  }
  @media screen and (min-width: 768px) {
    .details {
      display: grid;
      grid-template-columns: 1fr 15rem;
      margin-top: 3rem;
    }
  }
  @media print {
    .details {
      display: none;
    }
    .chart {
      background: #ffffff;
    }
  }
`;

export default ElevationChartStyles;
