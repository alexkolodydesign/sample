import styled from '@emotion/styled';

const OnboardingStyles = styled.div`
  h1 {
    font-size: 2.2rem;
    text-transform: uppercase;
    font-weight: 100;
    color: #4d4e4e;
    span {
      font-weight: 700;
      font-size: 2.8rem;
    }
  }
  .onboarding {
    position: fixed;
    z-index: 3;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: rgba(255, 255, 255, 0.9);
  }
  .cta {
    padding: 1rem 2rem;
    background: #0d93f2;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.7rem;
    cursor: pointer;
    transition: all 500ms;
    &:hover {
      background: #262727;
      &.active {
        background: #0d93f2;
      }
    }
    &.active {
      background: #3fa9f5;
    }
  }
`;

export default OnboardingStyles;
