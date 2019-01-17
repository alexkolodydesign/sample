import styled from '@emotion/styled';

const DifficultyStyles = styled.div`
  .difficulty {
    p {
      margin: 3px 0 1em;
      color: ${({ mainMap }) => (mainMap ? '#777777' : '#000000')};
      text-transform: ${({ mainMap }) => (mainMap ? 'inherit' : 'uppercase')};
      font-weight: ${({ mainMap }) => (mainMap ? 'bold' : '500')};
      span {
        font-weight: 100;
        text-transform: initial;
      }
    }
    img {
      margin: 0 3px 0 2px;
      vertical-align: -2px;
      max-height: 1.25rem;
    }
    span {
      font-weight: normal;
    }
  }
`;

export default DifficultyStyles;
