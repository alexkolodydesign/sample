const TrailListMenu = props =>
  <div className="menu">
    <h3>Trail List</h3>
    <div className="search">
      <form action="">
        <input type="text" placeholder="Search here…" />
      </form>
    </div>
    <div className="trails">
      {props.trails.map( (trail, k) => <Trail trail={trail} key={k} /> )}
    </div>
    <style jsx>{`
      h3 {text-transform: uppercase; margin: 0 0 0 1rem; color: #fff;}
      .menu {
        padding: 1rem 0.5rem 2rem 0.5rem;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        background: #3fa9f5;
        width: 40rem;
        height: 40rem;
        position: absolute;
        right: 0;
        top: -47rem;
        overflow: hidden;
      }
      .search {
        margin-top: 1rem;
        background: #f2f2f2;
        form {
          display: flex;
          padding: 0.5rem;
          input {
            width: 100%;
            background: #fff;
            border: none;
            padding: 1rem 0.5rem;
          }
        }
      }
      .trails {
        background: #f2f2f2;
        padding: 0 0.5rem;
        height: calc(100% - 5rem);
        overflow-y: scroll;
      }
    `}</style>
  </div>


const Trail = props =>
  <div className="trail">
    <img src="https://placehold.it/75x75" alt=""/>
    <div className="details">
      <h4>{props.trail.title}</h4>
      <p>Length: <span>{props.trail.length}</span></p>
      <p>Highlights: <span>{props.trail.highlights}</span></p>
      <p>Difficulty: <span>{props.trail.difficulty.default}</span></p>
      <p>Region: <span>{props.trail.region}</span></p>
    </div>
    <div className="trail_type">
      <img src="/static/images/menu/hiking.svg" alt="Select Hiking Trails" />
      <img src="/static/images/menu/biking.svg" alt="Select Biking Trails" />
      <img src="/static/images/menu/horse.svg" alt="Select Horseback Trails" />
      <img src="/static/images/menu/atv.svg" alt="Select ATV Trails" />
    </div>
    <style jsx>{`
      .trail {
        background: #eee;
        display: grid;
        grid-template-columns: 7.5rem 1fr 8rem;
        margin: 1rem 0;
      }
      .details {
        padding: 0rem 2rem 0rem 1rem;
        h4 {margin: 0; font-weight: 700;}
        p {margin: 0; font-weight: 500;}
        p span {font-weight: 100;}
      }
      .trail_type {
        display: grid;
        grid-template: 4rem 4rem / 4rem 4rem;
        align-items: center;
        img {width: 3.5rem;}
      }
    `}</style>
  </div>

export default TrailListMenu
