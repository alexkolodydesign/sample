import { BarLoader } from 'react-spinners'

const LoadingScreen = () =>
  <div id='loader'>
    <BarLoader color={'#0098e5'} />
    <style jsx>{`
      #loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
        display: none;
        align-items: center;
        justify-content: center;
      }
    `}</style>
  </div>

export default LoadingScreen;
