import Link from 'next/link'

class TrailListMenu extends React.Component {
  constructor(props) {
    super(props)
    this.search = this.search.bind(this)
    this.state = {
      trails: this.props.trails,
      filteredTrails: this.props.trails
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.trails == nextProps.trails) return nextProps
    const state = {trails: nextProps.trails, filteredTrails: nextProps.trails}
    return state
  }
  search(searchTerm) {
    const value = searchTerm.target.value.toLowerCase()
    const trails = this.state.trails.filter( (trail) => trail.title.rendered.toLowerCase().includes(value) ? true : false)
    this.setState({filteredTrails: trails})
  }
  render() {
    return (
      <div className={this.props.menuState == "exiting" ? "exiting menu" : "menu"}>
        <h3>Trail List</h3>
        <div className="close" onClick={this.props.toggleMenu}>X</div>
        <div className="search">
          <form onChange={this.search}>
            <input type="text" placeholder="Search here…" />
          </form>
        </div>
        <div className="trails">
          {this.state.filteredTrails.map( (trail, k) => <Trail trail={trail} key={k} /> )}
        </div>
        <style jsx>{`
          h3 {text-transform: uppercase; margin: 0 0 0 1rem; color: #fff;}
          .menu {
            left: -2rem;
            right: -2rem;
            bottom: -2.35rem;
            top: initial;

            z-index: 10;
            padding: 1rem 0.5rem 2rem 0.5rem;
            border-top-left-radius: 1rem;
            border-top-right-radius: 1rem;
            background: #3fa9f5;

            height: 40rem;
            position: absolute;
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
            background-image: linear-gradient(rgba(255,255,255,0.98), rgba(255,255,255,0.98)), url(/static/images/background-pattern.svg);
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
          @media screen and (min-width: 768px) {
            .menu {
              left: 0;
              top: -43rem;
              z-index: -1;
              width: 30rem;
            }
          }
        `}</style>
      </div>
    )
  }
}

const Trail = props =>
  <div className="trail">
    <Link href={`/trails/${props.trail.slug}`}><a>
      <img src={props.trail.custom_data.media.pictures[0] ? props.trail.custom_data.media.pictures[0].sizes.medium : "https://placehold.it/75x75?text=unavailable"} alt=""/>
    </a></Link>
    <div className="details">
      <h4><Link href={`/trails/${props.trail.slug}`}><a>{props.trail.title.rendered}</a></Link></h4>
      <p>Length: <span>{props.trail.custom_data.length} Miles</span></p>
      {props.trail.custom_data.highlights &&
        <p>Highlights:
          {props.trail.custom_data.highlights.map((highlight, index, k) => {
            if(index < props.trail.custom_data.highlights.length - 1) {
              return <span key={k}> {highlight.label},</span>
            } else {
              return <span key={k}> {highlight.label}</span>
            }
          }
        )}</p>
      }
      <p>Difficulty: <span>{props.trail.custom_data.difficulty.defaultDifficulty.value}</span></p>
      <p>Region: <span>{props.trail.custom_data.region}</span></p>
    </div>
    <div className="trail_type">
      <img src="/static/images/menu/hiking.svg" alt="Select Hiking Trails" className={!props.trail.custom_data.recommendedUse.some((el) => el.value == 'hiking') && "inactive"} />
      <img src="/static/images/menu/biking.svg" alt="Select Biking Trails" className={!props.trail.custom_data.recommendedUse.some((el) => el.value == 'biking') && "inactive"} />
      <img src="/static/images/menu/horse.svg" alt="Select Equestrian Trails" className={!props.trail.custom_data.recommendedUse.some((el) => el.value == 'equestrian') && "inactive"} />
      <img src="/static/images/menu/atv.svg" alt="Select OHV Trails" className={!props.trail.custom_data.recommendedUse.some((el) => el.value == 'ohv') && "inactive"} />
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
        img {
          max-width: 100%;
          height: auto;
        }
      }
      .details {
        padding: 0.25rem 2rem 1rem 1rem;
        h4 {
          margin: 0; font-weight: 700;
          a {
            text-decoration: none;
            color: inherit;
          }
        }
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
