import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SelectTrailType = ({ changeTrailType, hiking, biking, equestrian, ohv }) => (
  <div className="trails">
    <button type="button" onClick={() => changeTrailType('hiking')}>
      <img
        src="/static/images/menu/hiking.svg"
        alt="Select Hiking Trails"
        className={hiking ? null : 'inactive'}
      />
    </button>
    <button type="button" onClick={() => changeTrailType('biking')}>
      <img
        src="/static/images/menu/biking.svg"
        alt="Select Biking Trails"
        className={biking ? null : 'inactive'}
      />
    </button>
    <button type="button" onClick={() => changeTrailType('equestrian')}>
      <img
        src="/static/images/menu/equestrian.svg"
        alt="Select Equestrian Trails"
        className={equestrian ? null : 'inactive'}
      />
    </button>
    <button type="button" onClick={() => changeTrailType('ohv')}>
      <img
        src="/static/images/menu/ohv.svg"
        alt="Select OHV Trails"
        className={ohv ? null : 'inactive'}
      />
    </button>
    <style jsx>
      {`
        button {
          background: none;
          border: none;
        }
        .trails {
          grid-column-start: 2;
        }
        img {
          width: 4rem;
          cursor: pointer;
          transition: all 500ms;
          &:not(:last-child) {
            margin-right: 1rem;
          }
          &:hover {
            transform: scale(1.1);
          }
          &:focus,
          &:active {
            transform: scale(1);
          }
          &.inactive {
            opacity: 0.2;
          }
        }
        @media screen and (min-width: 768px) {
          img {
            width: 5.5rem;
          }
        }
      `}
    </style>
  </div>
);

// Redux
const mapStateToProps = state => ({
  hiking: state.map.filters.trailType.hiking,
  biking: state.map.filters.trailType.biking,
  equestrian: state.map.filters.trailType.equestrian,
  ohv: state.map.filters.trailType.ohv
});
const mapDispatchToProps = dispatch => ({
  changeTrailType: trailType => dispatch({ type: 'CHANGE_TRAIL_TYPE', trailType })
});

SelectTrailType.propTypes = {
  changeTrailType: PropTypes.func.isRequired,
  hiking: PropTypes.bool.isRequired,
  biking: PropTypes.bool.isRequired,
  equestrian: PropTypes.bool.isRequired,
  ohv: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectTrailType);
