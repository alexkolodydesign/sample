import styled from '@emotion/styled';

const RangeSliderStyles = styled.div`
  padding: 1rem;
  p {
    text-align: center;
  }
  span {
    cursor: pointer;
    background: #ddd;
    text-align: center;
    padding: 0.5rem;
    margin: 0 auto;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    text-transform: uppercase;
    color: #777;
    transition: all 500ms;
    &:hover {
      color: #333;
      background: #ccc;
    }
  }
  input[type='range'] {
    width: 100%;
    color: #000;
  }
`;

export default RangeSliderStyles;
