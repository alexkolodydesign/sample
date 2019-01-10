import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TrailSystemGuide = ({ system, highlightRegion, goToSystem }) => (
  <div className="systems">
    <div>
      <button
        type="button"
        className={system === 'zion-national-park' && 'active'}
        onClick={() => {
          highlightRegion('Canyon');
          goToSystem(12, { lat: 37.251888, lng: -112.96201 });
        }}
      >
        Zion National Park
      </button>
    </div>
    <div>
      <button
        type="button"
        className={system === 'snow-canyon-state-park' && 'active'}
        onClick={() => {
          highlightRegion('Urban');
          goToSystem(12, { lat: 37.204665, lng: -113.644752 });
        }}
      >
        Snow Canyon State Park
      </button>
    </div>
    <div>
      <button
        type="button"
        className={system === 'gooseberry-mesa' && 'active'}
        onClick={() => {
          highlightRegion('Mesa');
          goToSystem(12, { lat: 37.142663, lng: -113.190518 });
        }}
      >
        Gooseberry Mesa
      </button>
    </div>
    <style jsx>
      {`
        .systems {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          z-index: 2;
          display: flex;
          align-items: stretch;
          justify-content: space-evenly;
          & > div {
            flex: 1;
            &:nth-child(2) a {
              border-left: 1px solid #959595;
              border-right: 1px solid #959595;
            }
          }
        }
        button {
          text-decoration: none;
          border: none;
          border-radius: 0;
          background: #aaa;
          padding: 0.5rem;
          text-align: center;
          color: #fff;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 500ms;
          position: relative;
          display: block;
          &:hover {
            background: #262727;
          }
          &.active {
            background: #3fa9f5;
            &:hover {
              background: #0d93f2;
            }
          }
          span {
            display: none;
          }
        }
        @media screen and (min-width: 992px) {
          .systems {
            left: initial;
            & > div {
              flex: 1;
              &:first-child a {
                border-top-left-radius: 2rem;
                border-bottom-left-radius: 2rem;
              }
            }
          }
          button {
            width: 25rem;
            span {
              display: inline-block;
            }
          }
        }
      `}
    </style>
  </div>
);

// Redux
const mapStateToProps = state => ({
  system: state.map.system
});
const mapDispatchToProps = dispatch => ({
  goToSystem: (zoom, center) => {
    const location = { zoom, center };
    return dispatch({ type: 'GO_TO_SYSTEM', location });
  },
  highlightRegion: name => dispatch({ type: 'HIGHLIGHT_REGION', name })
});

TrailSystemGuide.propTypes = {
  goToSystem: PropTypes.func.isRequired,
  highlightRegion: PropTypes.func.isRequired,
  system: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrailSystemGuide);
