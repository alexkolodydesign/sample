import styled from '@emotion/styled';

const GPSButton = styled.button`
  padding: 5px;
  background: #4d4e4e;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
  img {
    width: 3rem;
    height: 3rem;
    padding: 3px;
  }
  .st1 {
    fill: #ffffff;
  }
  @media screen and (min-width: 768px) {
    img {
      width: 4rem;
    }
  }
  @media screen and (min-width: 992px) {
    img {
      width: 4.5rem;
    }
  }
`;

export default GPSButton;
