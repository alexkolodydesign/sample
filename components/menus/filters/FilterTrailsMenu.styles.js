import styled from '@emotion/styled';

const FilterTrailsMenuStyles = styled.div`
  h3 {
    text-transform: uppercase;
    margin: 0 0 0 1rem;
    color: #fff;
  }
  left: -2rem;
  right: -2rem;
  bottom: -2.35rem;
  top: initial;

  z-index: 10;
  padding: 1rem 0.5rem 3.5rem 0.5rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background: #3fa9f5;

  height: 40rem;
  position: absolute;
  overflow: hidden;
  animation-name: slideUp;
  animation-duration: 500ms;
  @keyframes slideUp {
    from {
      transform: translateY(25rem);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .options {
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.98),
        rgba(255, 255, 255, 0.98)
      ),
      url(/static/images/background-pattern.svg);
    background-position: center;
    background-size: 29rem auto;
    padding: 0 0.5rem;
    margin-top: 1rem;
    height: calc(100% - 5rem);
    overflow-y: scroll;
  }
  .close {
    color: #3fa9f5;
    background: #fff;
    border: none;
    position: absolute;
    right: 3rem;
    top: 1rem;
    padding: 0.5rem 0.5rem;
    border-radius: 100%;
    line-height: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 500ms;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
  @media screen and (min-width: 768px) {
    .menu {
      left: 0;
      top: -47rem;
      z-index: -1;
      width: 30rem;
    }
  }
`;

export default FilterTrailsMenuStyles;
