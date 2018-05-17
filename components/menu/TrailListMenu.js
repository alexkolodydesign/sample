const TrailListMenu = props =>
  <div className={props.menuState == "exiting" ? "exiting menu" : "menu"}>
    <h3>Trail List</h3>
    <div className="close" onClick={props.toggleMenu}>X</div>
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
        z-index: -1;
        overflow: hidden;
        animation-name: slideUp;
        animation-duration: 500ms;
        &.exiting {
          transition: 500ms;
          transform: translateY(25rem);
          opacity: 0;
        }
      }
      @keyframes slideUp {
        from {transform: translateY(25rem);opacity: 0;}
        to {transform: translateY(0); opacity: 1;}
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
        background-image: linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), url(/static/images/background-pattern.svg);
        padding: 0 0.5rem;
        height: calc(100% - 5rem);
        overflow-y: scroll;
      }
      .close {
        color: #3fa9f5;
        background: #fff;
        position: absolute;
        right: 3rem;
        top: 1rem;
        padding: .5rem 0.5rem;
        border-radius: 100%;
        line-height: 1.0rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 500ms;
        opacity: 0.5;
        &:hover {
          opacity: 1;
        }
      }
    `}</style>
  </div>


const Trail = props =>
  <div className="trail">
    <img src={props.trail.image ? props.trail.image : "https://placehold.it/75x75?text=coming-soon"} alt=""/>
    <div className="details">
      <h4>{props.trail.title}</h4>
      <p>Length: <span>{props.trail.length}</span></p>
      <p>Highlights: <span>{props.trail.highlights}</span></p>
      <p>Difficulty: <span>{props.trail.difficulty.default}</span></p>
      <p>Region: <span>{props.trail.region}</span></p>
    </div>
    <div className="trail_type">
      <img src="/static/images/menu/hiking.svg" alt="Select Hiking Trails" className={!props.trail.recommendedUse.hiking && "inactive"} />
      <img src="/static/images/menu/biking.svg" alt="Select Biking Trails" className={!props.trail.recommendedUse.biking && "inactive"} />
      <img src="/static/images/menu/horse.svg" alt="Select Horseback Trails" className={!props.trail.recommendedUse.horseback && "inactive"} />
      <img src="/static/images/menu/atv.svg" alt="Select ATV Trails" className={!props.trail.recommendedUse.atv && "inactive"} />
    </div>
    <style jsx>{`
      .trail {
        background: #eee;
        display: grid;
        grid-template-columns: 7.5rem 1fr 8rem;
        margin: 1rem 0;
        animation-fill-mode: forwards;
        &:nth-child(1) {
          animation-name: slideUp;
          animation-duration: 500ms;
          animation-delay: 50ms;
        }
        &:nth-child(2) {
          animation-name: slideUp;
          animation-duration: 500ms;
          animation-delay: 100ms;
        }
        &:nth-child(3) {
          animation-name: slideUp;
          animation-duration: 500ms;
          animation-delay: 200ms;
        }
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
      .inactive {
        opacity: 0.25;
        filter: grayscale();
      }
      @keyframes slideUp {
        from {transform: translateY(25rem);opacity: 0;}
        to {transform: translateY(0); opacity: 1;}
      }
    `}</style>
  </div>

export default TrailListMenu
