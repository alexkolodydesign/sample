import Link from 'next/link'
import {goToSystem} from '../../redux/actions'
import { connect } from 'react-redux'

// Redux
const mapStateToProps = (state, ownProps) => {
  return {
    map: state.map,
    ...ownProps
  }
}
const mapDispatchToProps = dispatch => {
  return {
    goToSystem: (zoom, center) => dispatch(goToSystem(zoom, center))
  }
}
const TrailSystemGuide = props => {
  return (
    <div className="systems">
      <div>
        <a className={props.system == "zion-national-park" && "active"} onClick={() => props.goToSystem(12, { lat: 37.251888, lng: -112.962010 })}>
          Zion <span>National Park</span>
        </a>
      </div>
      <div>
        <a className={props.system == "snow-canyon-state-park" && "active"} onClick={() => props.goToSystem(12, { lat: 37.204665, lng: -113.644752 })}>
          Snow Canyon <span>State Park</span>
        </a>
      </div>
      <div>
        <a className={props.system == "gooseberry-mesa" && "active"} onClick={() => props.goToSystem(12, { lat: 37.142663, lng: -113.190518 })}>
          Gooseberry <span>Mesa</span>
        </a>
      </div>
      <style jsx>{`
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

        a {
          text-decoration: none;
          border: none;
          background: #aaa;
          padding: 0.5rem;
          height: calc(100% - 1rem);
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
          a {
            width: 25rem;
            span {
              display: inline-block;
            }
          }
        }
      `}</style>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TrailSystemGuide)
