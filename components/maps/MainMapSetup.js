import axios from "axios"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import Region from './Region'
import RegionTrail from './RegionTrail'
import MainMap from './MainMap'

const MainMapSetup = props => {
  return (
    <div className="map">
      <MapContainer
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} id="washington_map" />}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ&v=3.exp&libraries=geometry,drawing,places"
        regions={props.regions}
      />
      <style jsx>{`
        .map {
          background: #eee;
          position: fixed;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: calc(100% - 17.5rem);
          z-index: 1;
        }
        @media screen and (min-width: 768px) {
          .map {
            height: calc(100% - 15.75rem);
          }
        }
        @media screen and (min-width: 992px) {
          .map {
            height: calc(100% - 10.75rem);
          }
        }
      `}</style>
    </div>
  )
}

const MapContainer = withScriptjs(withGoogleMap( (props) => <MainMap regions={props.regions} /> ))

export default MainMapSetup
