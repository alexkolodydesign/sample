export default class RegionMap extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="map">
        <div className="wrapper">
          <h2>Region Map</h2>
          <p>{this.props.map.view}</p>
        </div>
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
