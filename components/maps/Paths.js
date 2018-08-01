import { Polyline } from "react-google-maps"

const Paths = props =>
  <React.Fragment>
    {Array.isArray(props.coordinates[0]) ?
      <React.Fragment>
        {props.coordinates.map((line, k) => {
          if (!line) return null
          return (
            <Polyline
              path={ line.map(point => ({lat: Number(point.lat), lng: Number(point.lng), elevation: Number(point.elevation)})) }
              options={{
                strokeColor: props.trailColor,
                strokeOpacity:1,
                strokeWeight:3,
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
    :
      <Polyline
        path={props.coordinates}
        options={{
          strokeColor: props.trailColor,
          strokeOpacity:1,
          strokeWeight:3,
        }}
        onClick={(e) => {
          const coord = {lat: e.latLng.lat(), lng: e.latLng.lng()}
          props.toggleMenu(coord)
        }}
      />
    }
  </React.Fragment>

export default Paths