import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const GPS = ({ gps, toggleGPS }) => (
  <>
    <button className={gps ? 'active gps' : 'gps'} onClick={toggleGPS} type="button">
      <img src="/static/images/menu/gps.svg" alt="Your GPS" />
      <style jsx>
        {`
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
          .st1 {
            fill: #ffffff;
          }
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
        `}
      </style>
    </button>
  </>
);

GPS.propTypes = {
  gps: PropTypes.bool.isRequired,
  toggleGPS: PropTypes.func.isRequired
};

// Redux
const mapStateToProps = state => ({ gps: state.map.gps });
const mapDispatchToProps = dispatch => ({
  toggleGPS: () => dispatch({ type: 'TOGGLE_GPS' })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GPS);
