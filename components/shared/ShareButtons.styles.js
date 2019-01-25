import styled from '@emotion/styled';

const ShareButtonsStyles = styled.div`
  display: flex;
  .SocialMediaShareButton {
    padding-right: 1rem;
    transition: all 0.1s linear;
    cursor: pointer;
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

export default ShareButtonsStyles;
