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
  const coordinates = props.coordinates || null
  if (!coordinates || coordinates == null || coordinates == undefined || coordinates.length < 1) return null
  if (Array.isArray(coordinates[0])) {
    // If a trail has multiple paths
    return (
      <React.Fragment>
        {coordinates.map((line, k) => {
          if (!line) return null
          return (
            <React.Fragment key={k}>
              <Polyline
                path={ line.map(point => ({lat: Number(point.lat), lng: Number(point.lng), elevation: Number(point.elevation)})) }
                options={{
                  strokeColor: props.trailColor,
                  strokeOpacity: 0.0,
                  strokeWeight: 100,
                }}
                onClick={(e) => {
                  const coord = {lat: e.latLng.lat(), lng: e.latLng.lng()}
                  props.toggleMenu(coord)
                }}
              />
              <Polyline
                path={ line.map(point => ({lat: Number(point.lat), lng: Number(point.lng), elevation: Number(point.elevation)})) }
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
            strokeOpacity: 0.0,
            strokeWeight: 100,
          }}
          onClick={(e) => {
            const coord = {lat: e.latLng.lat(), lng: e.latLng.lng()}
            props.toggleMenu(coord)
          }}
        />
        <Polyline
          path={coordinates}
          options={{
            strokeColor: props.trailColor,
            strokeOpacity: 1,
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
