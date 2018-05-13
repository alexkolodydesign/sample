import { connect } from 'react-redux';
import { changeTrailType } from '../../redux/actions'

const SelectTrailType = props =>
  <div className="trails">
    <img src="/static/images/menu/hiking.svg" alt="Select Hiking Trails"
      className={props.map.filter.hiking ? null : "inactive"}
      onClick={ () => props.changeTrailType(props.map.filter, "hiking") }
    />
    <img src="/static/images/menu/biking.svg" alt="Select Biking Trails"
      className={props.map.filter.biking ? null : "inactive"}
      onClick={ () => props.changeTrailType(props.map.filter, "biking") }
    />
    <img src="/static/images/menu/horse.svg" alt="Select Horseback Trails"
      className={props.map.filter.horseback ? null : "inactive"}
      onClick={ () => props.changeTrailType(props.map.filter, "horseback") }
    />
    <img src="/static/images/menu/atv.svg" alt="Select ATV Trails"
      className={props.map.filter.atv ? null : "inactive"}
      onClick={ () => props.changeTrailType(props.map.filter, "atv") }
    />
    <style jsx>{`
      .trails {
        grid-column-start: 2;
      }
      img {
        width: 5.5rem;
        cursor: pointer;
        transition: all 500ms;
        &:not(:last-child) {
          margin-right: 1rem;
        }
        &:hover {
          transform: scale(1.1);
        }
        &.inactive {
          opacity: 0.5;
        }
      }
    `}</style>
  </div>

// Redux
const mapStateToProps = (state, ownProps) => ({ map: state.map });
const mapDispatchToProps = dispatch => {
  return {
    changeTrailType: (filter, filterType) => {
      if (filter[filterType] == true) {filter[filterType] = false}
      else {filter[filterType] = true}
      dispatch(changeTrailType(filter));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectTrailType);


