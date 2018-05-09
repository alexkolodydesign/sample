import Link from 'next/link'

const TrailSystemMap = props =>
  <div className="map">
    <div className="wrapper">
      <h2>Trail System Map</h2>
      <p><Link href="/">…back to Region View</Link></p>
      <p><Link href="/trails/trail" as="/trails/emerald-pools">View Trail</Link></p>
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

  export default TrailSystemMap
