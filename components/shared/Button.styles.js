import styled from '@emotion/styled';

const Button = styled.button`
  border: none;
  border-radius: 1rem;
  background: #3fa9f5;
  padding: 1rem 2rem;
  color: #fff;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 500ms;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
  }
`;

export const BackButton = styled.button`
  border: none;
  border-radius: 0.25rem;
  background: #262727;
  padding: 0.5rem 2rem;
  color: #fff;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 500ms;
  margin-top: 1.5rem;
  &:hover {
    background: #666666;
  }
`;

export default Button;
