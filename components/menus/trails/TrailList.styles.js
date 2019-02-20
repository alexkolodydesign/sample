import styled from '@emotion/styled';

const TrailListButton = styled.button`
  padding: 4px 5px;
  background: #4d4e4e;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 500ms;
  position: relative;
  &:hover {
    background: #262727;
    &.active {
      background: #0d93f2;
    }
  }
  &.active {
    background: #3fa9f5;
  }
  img {
    width: 2.5rem;
    height: 2.5rem;
    padding: 3px;
  }
  p {
    display: none;
    margin: 0;
    padding-right: 1rem;
  }
  @media screen and (min-width: 768px) {
    display: flex;
    p {
      display: block;
    }
    img {
      width: 3rem;
      height: 3rem;
    }
  }
  @media screen and (min-width: 992px) {
    img {
      width: 4rem;
    }
  }
`;

export default TrailListButton;
