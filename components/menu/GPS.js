import {goToSystem, toggleGPS} from '../../redux/actions'
import { connect } from 'react-redux'

// Redux
const mapStateToProps = (state, ownProps) => {
  return {
    gps: state.map.gps
  };
};
const mapDispatchToProps = dispatch => {
  return {
    goToSystem: (zoom, center) => dispatch(goToSystem(zoom, center)),
    toggleGPS: (zoom, center) => dispatch(toggleGPS())
  };
};

const GPS = props => {
  function userLocation() {
    props.toggleGPS()
  }
  return (
    <React.Fragment>
      <button className={props.gps && "active"} onClick={userLocation}>
        <img src="/static/images/menu/gps.svg" alt="Your GPS"/>
      </button>
      <style jsx>{`
        button {
          padding: 5px;
          background: #4d4e4e;
          color: #fff;
          border: none;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 500ms;
          &:hover {
            background: #262727;
          }
          &.active:hover {
            background: #0d93f2;
          }
          &.active {
            background: #3fa9f5;
          }
        }
        img {
          width: 3rem;
          height: 3rem;
          padding: 3px;
        }
        .st1{fill:#FFFFFF;}
        @media screen and (min-width: 768px) {
          img {
            width: 4rem;
          }
        }
        @media screen and (min-width: 992px) {
          img {
            width: 4.5rem;
          }
        }
      `}</style>
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(GPS)
