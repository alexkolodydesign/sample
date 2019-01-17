import styled from '@emotion/styled';

const TrailSystemGuideStyles = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
  & > div {
    flex: 1;
    &:first-child button {
      border-bottom-left-radius: 1rem;
    }
    &:nth-child(2) button {
      border-left: 1px solid #959595;
      border-right: 1px solid #959595;
    }
  }
  button {
    text-decoration: none;
    border: none;
    border-radius: 0;
    background: #aaa;
    padding: 0.75rem 0.5rem;
    text-align: center;
    color: #fff;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 500ms;
    position: relative;
    display: block;
    &:hover {
      background: #262727;
    }
    &.active {
      background: #3fa9f5;
      &:hover {
        background: #0d93f2;
      }
    }
    span {
      display: none;
    }
  }
  @media screen and (min-width: 992px) {
    left: initial;
    & > div {
      flex: 1;
      &:first-child a {
        border-top-left-radius: 2rem;
        border-bottom-left-radius: 2rem;
      }
    }
    button {
      width: 25rem;
      span {
        display: inline-block;
      }
    }
  }
`;

export default TrailSystemGuideStyles;
