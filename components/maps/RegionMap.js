import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polygon } from "react-google-maps"

export default class RegionMap extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="map">
        <Map
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          regionData={this.props.regionData}
        />
        <style jsx>{`
          .map {
            background: #eee;
            border: 0.1rem solid #333;
            position: fixed;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
          }
        `}</style>
      </div>
    )
  }
}

const Map = withScriptjs(withGoogleMap( (props) => {
  return (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={{ lat: 37.141, lng: -113.432 }}
    >
      {props.regionData.regions.map((region, k) => {
        return (
          <Polygon
            paths={region}
            strokeColor="#ff0000"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#ff0000"
            fillOpacity={0.35}
            onMouseOver={function () { this.setOptions({fillOpacity: 0.5}) }}
            onMouseOut={function () { this.setOptions({fillOpacity: 0.35}) }}
          />
        )
      })}
      {/*<Marker position={{ lat: 37.141, lng: -113.432 }} />*/}
    </GoogleMap>
  )
}))

