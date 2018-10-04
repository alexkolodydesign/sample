import Link from 'next/link'
import { connect } from 'react-redux'
import { filterAction } from '../../redux/filterAction'
import { highlightTrail } from '../../redux/actions'

// Redux
const mapStateToProps = (state, ownProps) => {
  return {
    metricType: state.map.metricType,
    trails: state.trails,
    filters: state.map.filters,
    ...ownProps
  };
};
const mapDispatchToProps = dispatch => {
  return {
    highlightTrail: (slug) => {
      dispatch(highlightTrail(slug));
    }
  };
};

class TrailListMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredTrails: filterAction(this.props.trails, this.props.filters, true),
      trails: filterAction(this.props.trails, this.props.filters, true),
      search: ''
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.trails.length == nextProps.trails.length) return nextProps
    let newTrails
    const value = prevState.search
    if (!value) newTrails = filterAction(nextProps.trails, nextProps.filters, true)
    else newTrails = filterAction(nextProps.trails, nextProps.filters, true).filter( (trail) => trail.title.rendered.toLowerCase().includes(value) ? true : false)
    const state = {trails: newTrails, filteredTrails: newTrails}
    return state
  }
  render() {
    const trails = filterAction(this.props.trails, this.props.filters, true)
    return (
      <div className={this.props.menuState == "exiting" ? "exiting menu" : "menu"}>
        <h3>Trail List</h3>
        <div className="close" onClick={this.props.toggleMenu}>X</div>
        <div className="search">
          <form onChange={(e) => this.setState({search: e.target.value.toLowerCase()})}>
            <input type="text" placeholder="Search here…" />
          </form>
        </div>
        <div className="trails">
          {this.state.filteredTrails.map( (trail, k) => <Trail trail={trail} key={k} highlightTrail={this.props.highlightTrail} metricType={this.props.metricType} /> )}
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
              top: -45.5rem;
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
  <React.Fragment>
    <Link href="/trails/trail" as={`/trails/${props.trail.slug}`}>
      <a className="trail" onMouseEnter={()=> props.highlightTrail(props.trail.slug)}>
        <div
          style={{backgroundImage: `url(${props.trail.custom_data.media.pictures[0] ? props.trail.custom_data.media.pictures[0].sizes.medium : "/static/images/washco-logo.png"})`, backgroundPosition: "center", backgroundSize: "cover"}}
        >
        </div>
        <div className="details">
          <h4 dangerouslySetInnerHTML={{__html: props.trail.title.rendered}} />
          <p>
            {props.metricType === 'imperial' ?
              <span>{props.trail.custom_data.length} mi</span>
            :
              <span>{(props.trail.custom_data.length * 1.60934).toFixed(2)} km</span>
            }
          </p>
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
          {props.trail.custom_data.difficulty.defaultDifficulty.value && <p><span>{props.trail.custom_data.difficulty.defaultDifficulty.label}</span></p>}
          {props.trail.custom_data.region && <p><span>{props.trail.custom_data.region} Region</span></p>}
        </div>
        <div className="trail_type">
          <img src="/static/images/menu/hiking.svg" alt="Select Hiking Trails" className={!props.trail.custom_data.recommendedUse == '' ? (!props.trail.custom_data.recommendedUse.some((el) => el.value == 'hiking') && "inactive") : "inactive"} />
          <img src="/static/images/menu/biking.svg" alt="Select Biking Trails" className={!props.trail.custom_data.recommendedUse == '' ? (!props.trail.custom_data.recommendedUse.some((el) => el.value == 'biking') && "inactive") : "inactive"} />
          <img src="/static/images/menu/equestrian.svg" alt="Select Equestrian Trails" className={!props.trail.custom_data.recommendedUse == '' ? (!props.trail.custom_data.recommendedUse.some((el) => el.value == 'equestrian') && "inactive") : "inactive"} />
          <img src="/static/images/menu/ohv.svg" alt="Select OHV Trails" className={!props.trail.custom_data.recommendedUse == '' ? (!props.trail.custom_data.recommendedUse.some((el) => el.value == 'ohv') && "inactive") : "inactive"} />
        </div>
        <style jsx>{`
          a {
            text-decoration: none;
            color: #777;
          }
          .trail {
            background: #eee;
            display: grid;
            grid-template-columns: 7.5rem 1fr 6.5rem;
            margin: 0 0 1rem;
            animation-fill-mode: forwards;
            &:nth-child(1) {
              opacity: 0;
              animation-name: slideUp;
              animation-duration: 500ms;
              animation-delay: 50ms;
            }
            &:nth-child(2) {
              opacity: 0;
              animation-name: slideUp;
              animation-duration: 500ms;
              animation-delay: 150ms;
            }
            &:nth-child(3) {
              opacity: 0;
              animation-name: slideUp;
              animation-duration: 500ms;
              animation-delay: 250ms;
            }
            &:nth-child(4) {
              opacity: 0;
              animation-name: slideUp;
              animation-duration: 500ms;
              animation-delay: 350ms;
            }
            &:nth-child(5) {
              opacity: 0;
              animation-name: slideUp;
              animation-duration: 500ms;
              animation-delay: 450ms;
            }
            img {
              max-width: 100%;
              height: auto;
            }
          }
          .details {
            padding: 0.25rem 1rem 1rem 1rem;
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
            grid-template: 2.5rem 2.5rem / 2.5rem 2.5rem;
            align-self: center;
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
      </a>
    </Link>
  </React.Fragment>

export default connect(mapStateToProps, mapDispatchToProps)(TrailListMenu)
