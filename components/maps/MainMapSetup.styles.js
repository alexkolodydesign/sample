import styled from '@emotion/styled';

const MainMapSetupStyles = styled.div`
  background: #eee;
  position: fixed;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 17.5rem);
  z-index: 1;
  @media screen and (min-width: 768px) {
    height: calc(100% - 15.75rem);
  }
  @media screen and (min-width: 992px) {
    height: calc(100% - 10.75rem);
  }
`;

export default MainMapSetupStyles;
