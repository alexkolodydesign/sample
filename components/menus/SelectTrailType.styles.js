import styled from '@emotion/styled';

const SelectTrailTypeStyles = styled.div`
  button {
    background: none;
    border: none;
  }
  grid-column-start: 2;
  img {
    width: 4rem;
    cursor: pointer;
    transition: all 500ms;
    &:not(:last-child) {
      margin-right: 1rem;
    }
    &:hover {
      transform: scale(1.1);
    }
    &:focus,
    &:active {
      transform: scale(1);
    }
    &.inactive {
      opacity: 0.2;
    }
  }
  @media screen and (min-width: 768px) {
    img {
      width: 5.5rem;
    }
  }
`;

export default SelectTrailTypeStyles;
