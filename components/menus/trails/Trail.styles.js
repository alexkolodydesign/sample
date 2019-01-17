import styled from '@emotion/styled';

const TrailLink = styled.a`
  text-decoration: none;
  color: #777;
  background: #eee;
  display: grid;
  grid-template-columns: 7.5rem 1fr 6.5rem;
  margin: 0 0 1rem;
  animation-fill-mode: forwards;
  &:nth-child(1) {
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 500ms;
    animation-delay: 50ms;
  }
  &:nth-child(2) {
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 500ms;
    animation-delay: 150ms;
  }
  &:nth-child(3) {
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 500ms;
    animation-delay: 250ms;
  }
  &:nth-child(4) {
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 500ms;
    animation-delay: 350ms;
  }
  &:nth-child(5) {
    opacity: 0;
    animation-name: slideUp;
    animation-duration: 500ms;
    animation-delay: 450ms;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  .details {
    padding: 0.25rem 1rem 1rem 1rem;
    h4 {
      margin: 0;
      font-weight: 700;
      a {
        text-decoration: none;
        color: inherit;
      }
    }
    p {
      margin: 0;
      font-weight: 500;
    }
    p span {
      font-weight: 100;
    }
  }
  .trail_type {
    display: grid;
    grid-template: 2.5rem 2.5rem / 2.5rem 2.5rem;
    align-self: center;
    img {
      width: 3.5rem;
    }
  }
  .inactive {
    opacity: 0.25;
    filter: grayscale();
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

export default TrailLink;
