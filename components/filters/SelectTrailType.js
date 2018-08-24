import { connect } from 'react-redux';
import { changeTrailType } from '../../redux/actions'

const SelectTrailType = props =>
  <div className="trails">
    <img src="/static/images/menu/hiking.svg" alt="Select Hiking Trails"
      className={props.map.filter.trailType.hiking ? null : "inactive"}
      onClick={ () => props.changeTrailType("hiking") }
    />
    <img src="/static/images/menu/biking.svg" alt="Select Biking Trails"
      className={props.map.filter.trailType.biking ? null : "inactive"}
      onClick={ () => props.changeTrailType("biking") }
    />
    <img src="/static/images/menu/equestrian.svg" alt="Select Equestrian Trails"
      className={props.map.filter.trailType.equestrian ? null : "inactive"}
      onClick={ () => props.changeTrailType("equestrian") }
    />
    <img src="/static/images/menu/ohv.svg" alt="Select OHV Trails"
      className={props.map.filter.trailType.ohv ? null : "inactive"}
      onClick={ () => props.changeTrailType("ohv") }
    />
    <style jsx>{`
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
        &:focus, &:active {
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
    `}</style>
  </div>

// Redux
const mapStateToProps = (state, ownProps) => ({ map: state.map });
const mapDispatchToProps = dispatch => {
  return {
    changeTrailType: (trailType) => {
      dispatch(changeTrailType(trailType));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectTrailType);


