import { Polyline } from "react-google-maps"
import { connect } from 'react-redux'

// Redux
const mapStateToProps = (state, ownProps) => {
  return {
    highlight: state.map.highlightTrail,
    ...ownProps
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

const Paths = props => {
  const coordinates = props.coordinates.trail.coordinates
  if (coordinates == null || coordinates == undefined) return null
  if (Array.isArray(coordinates[0])) {
    // If a trail has multiple paths
    return (
      <React.Fragment>
        {coordinates.map((line, k) => {
          if (!line) return null
          return (
            <Polyline
              path={ line.map(point => ({lat: Number(point.lat), lng: Number(point.lng), elevation: Number(point.elevation)})) }
              options={{
                strokeColor: props.trailColor,
                strokeOpacity:1,
                strokeWeight: props.highlight == props.slug ? 6 : 3,
              }}
              key={k}
              onClick={(e) => {
                const coord = {lat: e.latLng.lat(), lng: e.latLng.lng()}
                props.toggleMenu(coord)
              }}
            />
          )
        })}
      </React.Fragment>
    )
  }
  // Single path trail
  return (
    <React.Fragment>
        <Polyline
          path={coordinates}
          options={{
            strokeColor: props.trailColor,
            strokeOpacity:1,
            strokeWeight: props.highlight == props.slug ? 6 : 3,
          }}
          onClick={(e) => {
            const coord = {lat: e.latLng.lat(), lng: e.latLng.lng()}
            props.toggleMenu(coord)
          }}
        />
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Paths)
