import styled from '@emotion/styled';

const NearbyTrailsStyles = styled.div`
  padding: 1.5rem 3rem 3rem 3rem;
  background-image: linear-gradient(rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.98)),
    url(/static/images/background-pattern.svg);
  .nearby_trails {
    height: 15rem;
    overflow-y: scroll;
  }
  h2 {
    text-transform: uppercase;
    margin: 0.25rem 0;
  }
  .trail {
    background: #eee;
    display: grid;
    grid-template-columns: 10rem 1fr 6.5rem;
    margin: 0 0 1rem;
    img {
      max-width: 100%;
      height: auto;
    }
  }
  .details {
    padding: 0.25rem 1rem 1rem 1rem;
    h4 {
      margin: 0;
      font-weight: 700;
      a {
        text-decoration: none;
        color: inherit;
      }
    }
    p {
      margin: 0;
      font-weight: 500;
    }
    p span {
      font-weight: 100;
    }
  }
  .trail_type {
    display: grid;
    grid-template: 2.5rem 2.5rem / 2.5rem 2.5rem;
    align-self: center;
    img {
      width: 3.5rem;
    }
  }
  .inactive {
    opacity: 0.25;
    filter: grayscale();
  }
`;

export default NearbyTrailsStyles;
