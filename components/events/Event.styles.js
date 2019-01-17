import styled from '@emotion/styled';

const EventStyles = styled.div`
  background: #eee;
  display: grid;
  grid-template-columns: 7.5rem 1fr;
  margin: 1rem 0;
  animation-fill-mode: forwards;
  &:nth-child(1) {
    animation-name: slideUp;
    animation-duration: 500ms;
    animation-delay: 50ms;
  }
  &:nth-child(2) {
    animation-name: slideUp;
    animation-duration: 500ms;
    animation-delay: 100ms;
  }
  &:nth-child(3) {
    animation-name: slideUp;
    animation-duration: 500ms;
    animation-delay: 200ms;
  }
  a {
    max-width: 100%;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  .details {
    padding: 0.25rem 2rem 1rem 1rem;
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

export default EventStyles;
