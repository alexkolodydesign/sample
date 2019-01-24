import React from 'react';
import { BarLoader } from 'react-spinners';
import LoadingScreenStyles from './LoadingScreen.styles';

const LoadingScreen = () => (
  <LoadingScreenStyles id="loader">
    <BarLoader color="#0098e5" />
  </LoadingScreenStyles>
);
export default LoadingScreen;
