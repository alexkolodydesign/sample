import styled from '@emotion/styled';

const FilterTrailsButton = styled.button`
  padding: 5px;
  background: #4d4e4e;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 500ms;
  &:hover {
    background: #262727;
  }
  &.active:hover {
    background: #0d93f2;
  }
  &.active {
    background: #3fa9f5;
  }
  .filter-trails-title {
    display: none;
  }
  img {
    width: 3rem;
    height: 3rem;
    padding: 3px;
  }
  p {
    margin: 0;
    padding-right: 1rem;
  }
  @media screen and (min-width: 768px) {
    .filter-trails-title {
      display: block;
    }
    img {
      width: 4rem;
    }
  }
  @media screen and (min-width: 992) {
    img {
      width: 4.5rem;
    }
  }
`;

export default FilterTrailsButton;
