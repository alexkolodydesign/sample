import Link from 'next/link'

const TrailSystemMap = props =>
  <div className="map">
    <div className="wrapper">
      <h2>Trail System Map</h2>
      <p><Link href="/"><a>…back to Region View</a></Link></p>
      <p><Link href="/trails/trail" as="/trails/emerald-pools"><a>View Trail</a></Link></p>
      <h3>Trails Displaying</h3>
      <hr/>
      {props.system.trails.map((trail, k) => <Trail key={k} trail={trail} /> )}
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


const Trail = props =>
  <div>
    <p>
      {props.trail.title}&nbsp;
      | {props.trail.length} miles
      | {Object.keys(props.trail.seasons).filter((season) => props.trail.seasons[season] == true ? true : false).map((season) => season + " ")}</p>
  </div>

  export default TrailSystemMap
