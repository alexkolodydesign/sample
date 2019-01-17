import styled from '@emotion/styled';

const EventListButton = styled.button`
  padding: 2px;
  background: #3fa9f5;
  color: #fff;
  border: none;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 500ms;
  position: absolute;
  top: 50px;
  left: 15px;
  z-index: 2;
  width: 62px;
  height: 62px;
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
    width: 3rem;
    height: 3rem;
    padding: 2px;
  }
  p {
    display: none;
    margin: 0;
    padding-right: 1rem;
  }
  @media screen and (min-width: 768px) {
    button {
      display: flex;
    }
    p {
      display: block;
    }
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

export default EventListButton;
