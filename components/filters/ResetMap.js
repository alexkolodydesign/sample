import { connect } from 'react-redux'
import { resetMap } from '../../redux/actions'

// Redux
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  };
};
const mapDispatchToProps = dispatch => {
  return {
    resetMap: () => dispatch(resetMap())
  };
};

const ResetMap = props =>
  <React.Fragment>
    <button onClick={() => props.resetMap()}>Reset Map</button>
    <style jsx>{`
      button {
        margin: 1rem 0;
        padding: 1rem;
        color: #fff;
        background: none;
        border: 0.1rem solid #fff;
        width: 100%;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 500ms;
        &:hover {
          background: #0d93f2;
        }
      }
    `}</style>
  </React.Fragment>

export default connect(mapStateToProps, mapDispatchToProps)(ResetMap)
