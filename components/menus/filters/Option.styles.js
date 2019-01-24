import styled from '@emotion/styled';

const OptionStyles = styled.div`
  background: #eee;
  margin: 1rem 0;
  animation-fill-mode: forwards;
  &:nth-of-type(1) {
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 500ms;
    animation-delay: 50ms;
  }
  &:nth-of-type(2) {
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 500ms;
    animation-delay: 100ms;
  }
  &:nth-of-type(3) {
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 500ms;
    animation-delay: 200ms;
  }
  &:nth-of-type(4) {
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 500ms;
    animation-delay: 300ms;
  }
  &:nth-of-type(5) {
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 500ms;
    animation-delay: 400ms;
  }
  .title {
    padding: 2rem;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    display: flex;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 500ms;
    &:hover {
      background: #ddd;
    }
    h4 {
      font-weight: 700;
      margin: 0;
      flex: 1;
      span {
        position: relative;
        color: #000;
        &:after {
          content: '';
          position: absolute;
          top: 50%;
          width: 0.6rem;
          height: 0.6rem;
          background: transparent;
          border-top: 0.2rem solid #333;
          border-right: 0.2rem solid #333;
          box-shadow: 0 0 0 lightgray;
          transition: all 200ms ease;
          right: -2rem;
          transform: translate3d(0, -50%, 0) rotate(45deg);
        }
        &.active:after {
          transform: translate3d(0, -50%, 0) rotate(135deg);
        }
      }
    }
    p {
      margin: 0;
      font-weight: 500;
    }
    p span {
      color: #000;
      font-weight: 100;
    }
  }

  .options {
    & > button {
      color: #000;
      padding: 2rem;
      width: 100%;
      text-align: left;
      margin: 0.5rem 0;
      background: #ddd;
      border: none;
      cursor: pointer;
      transition: all 500ms;
      &:hover {
        background: #ccc;
      }
      &.active {
        background: #3fa9f5;
        color: #fff;
      }
    }
  }

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
`;

export default OptionStyles;
