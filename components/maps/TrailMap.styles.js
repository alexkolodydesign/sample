import styled from '@emotion/styled';

const TrailMapStyles = styled.div`
  @media screen {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    .map_container {
      background: #fff;
      background-image: linear-gradient(
          rgba(255, 255, 255, 0.98),
          rgba(255, 255, 255, 0.98)
        ),
        url(/static/images/background-pattern.svg);
      background-position: center;
      background-size: 29rem auto;
      padding: 1rem;
    }
    .map {
      background: #eee;
      width: 100%;
      height: 50rem;
    }
    .share_buttons {
      margin-top: 1.5rem;
    }
  }
  @media screen and (min-width: 768px) {
    .map_container {
      padding: 1em;
    }
    grid-column-start: 2;
    grid-column-end: 3;
  }
  @media screen and (min-width: 992px) {
    .map_container {
      padding: 3em;
    }
  }
  @media print {
    *,
    *:before,
    *:after {
      background: #ffffff;
    }
    width: 55%;
    float: left;
    margin-left: 4%;
    .map_container,
    .gm-style,
    .gm-style * {
      max-width: 100%;
    }
  }
`;

export const Buttons = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template: repeat(2, minmax(0, 1fr)) / repeat(2, minmax(0, 1fr));
  grid-gap: 1.5rem;
  button,
  a {
    border: none;
    border-radius: 1rem;
    background: #3fa9f5;
    padding: 1rem 2rem;
    color: #fff;
    font-size: 1.8rem;
    cursor: pointer;
    transition: all 500ms;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: #0d93f2;
    }
    &:last-of-type:not(button) {
      background: #262727;
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 2;
      text-align: center;

      &:hover {
        background: #666666;
      }
    }
    &.active {
      background-color: #00a89c;
    }
    img {
      width: 3rem;
      height: 3rem;
      margin-right: 1rem;
    }
  }
  @media screen and (min-width: 768px) {
    margin-top: 1.5rem;
    grid-template: 1fr 1fr / 1fr 1fr 1fr;
    a {
      &:last-of-type {
        text-decoration: none;
        // grid-column-start: 1;
        // grid-column-end: 4;
        // grid-row-start: 2;
        // grid-row-end: 3;
        grid-column: 1 / span 3;
        grid-row: 2;
      }
    }
  }
  @media print {
    display: none;
  }
`;

export default TrailMapStyles;
