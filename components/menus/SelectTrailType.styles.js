import styled from '@emotion/styled';

const SelectTrailTypeStyles = styled.div`
  button {
    background: none;
    border: none;
    padding: 3px;
  }
  img {
    width: 3rem;
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
  @media screen and (min-width: 620px) {
    img {
      width: 3.75rem;
    }
  }
  @media screen and (min-width: 650px) {
    img {
      width: 4rem;
    }
  }
  @media screen and (min-width: 768px) {
    button {
      padding: 4px;
    }
  }
  @media screen and (min-width: 870px) {
    img {
      width: 4.5rem;
    }
  }
  @media screen and (min-width: 992px) {
    button {
      padding: 7px;
    }
    img {
      width: 5.5rem;
    }
  }
`;

export default SelectTrailTypeStyles;
