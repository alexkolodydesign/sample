import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ResetMap = ({ resetMap }) => (
  <React.Fragment>
    <button onClick={() => resetMap()} type="button">
      Reset Map
    </button>
    <style jsx>
      {`
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
      `}
    </style>
  </React.Fragment>
);

// Redux
const mapDispatchToProps = dispatch => ({
  resetMap: () => {
    let zoom;
    if (window.innerWidth >= 768 && window.innerWidth < 991) zoom = 9;
    else if (window.innerWidth >= 992 && window.innerWidth < 1500) zoom = 10;
    else if (window.innerWidth > 1500) zoom = 11;
    else zoom = 8;
    return dispatch({ type: 'RESET_MAP', zoom });
  }
});

ResetMap.propTypes = {
  resetMap: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(ResetMap);
