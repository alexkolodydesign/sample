const GPS = props =>
  <React.Fragment>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 57 57" style={{enableBackground:"new 0 0 57 57"}}>
      <g>
        <path className="st0" d="M39.9,1.4H17.1C8.5,1.4,1.4,8.5,1.4,17.1v22.8c0,8.7,7.1,15.8,15.8,15.8h22.8c8.7,0,15.8-7.1,15.8-15.8V17.1 C55.6,8.5,48.5,1.4,39.9,1.4z"/>
        <path className="st1" d="M29.2,10.8c-0.1,0-0.3,0-0.4,0h0c-0.1,0-0.2,0-0.3,0l0,0l0,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.3,0-0.4,0 c-8.3,0.4-13.1,5.3-13.1,13.7c0,2.9,1.3,5,1.7,5.6l9.4,15.2c0.6,0.9,1.6,1.5,2.7,1.5s2.1-0.6,2.7-1.5l9.4-15.2 c0.5-0.6,1.7-2.7,1.7-5.6C42.3,16.1,37.5,11.1,29.2,10.8z M28.5,28.6c-3.5,0-6.3-2.8-6.3-6.3c0-3.5,2.8-6.3,6.3-6.3 s6.3,2.8,6.3,6.3C34.8,25.8,32,28.6,28.5,28.6z"/>
      </g>
    </svg>
    <style jsx>{`
      svg {
        display:none;
        width: 5.5rem;
        cursor: pointer;
        &:hover .st0 {
          fill: #262727;
        }
      }
      .st0{
        fill:#4D4E4E;
        transition: all 500ms;
      }
      .st1{fill:#FFFFFF;}
      @media screen and (min-width: 768px) {
        svg {
          display:block;
        }
      }
    `}</style>
  </React.Fragment>

export default GPS
