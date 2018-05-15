import { connect } from 'react-redux';
import { changeSeason } from '../../redux/actions'

const FilterTrailsMenu = props =>
  <div className={props.menuState == "exiting" ? "exiting menu" : "menu"}>
    <h3>Filter Trails</h3>
    <div className="close" onClick={props.toggleFilterMenu}>X</div>
    <div className="options">
      <Option title="Season of Hike" selected="" options={["Spring", "Summer", "Fall", "Winter"]} />
      <Option title="Difficulty" selected="" options={["Easy", "Moderate", "Hard"]} />
      <Option title="Length of Trail" selected="" options={["Short", "Moderate", "Long"]} />
      <Option title="Traffic Density" selected="" options={["Sparse", "Comfortable", "Long"]} />
      <Option title="Route Type" selected="" options={["Loop", "Non-Loop"]} />
      <Option title="Trail Type" selected="" options={["Hiking", "Biking", "Horseback", "ATV"]} />
      <Option title="Exclude" selected="" options="" />
    </div>
    <style jsx>{`
      h3 {text-transform: uppercase; margin: 0 0 0 1rem; color: #fff;}
      .menu {
        padding: 1rem 0.5rem 2rem 0.5rem;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        background: #3fa9f5;
        width: 30rem;
        height: 40rem;
        position: absolute;
        left: 0;
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
      .options {
        background: #f2f2f2;
        padding: 0 0.5rem;
        margin-top: 1rem;
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

// Redux
const mapStateToProps = (state, ownProps) => ({ map: state.map });
const mapDispatchToProps = dispatch => {
  return {
    changeSeason: (season) => {
      dispatch(changeSeason(season));
    }
  };
};

class Option extends React.Component {
  constructor(props) {
    super(props)
    this.state = {menu: false}
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  toggleMenu() {
    this.setState({menu: !this.state.menu})
  }
  render() {
    return (
      <div className="option">
        <div className="title" onClick={this.toggleMenu}>
          <h4><span className={this.state.menu ? "active" : null}>{this.props.title}</span></h4>
          <p><span>{this.props.selected}</span></p>
        </div>
        {this.state.menu ?
          <div className="options">
            {this.props.options && this.props.options.map((option, k) => {
              if (this.props.action) {
                return <div key={k} onClick={ () => this.props.action(option) } className={this.props.selected == option ? "active" : null}>{option}</div>
              }
              return <div key={k}>{option}</div>
            })}
          </div>
        : null}
        <style jsx>{`
          .option {
            background: #eee;
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
            &:nth-child(4) {
              animation-name: slideUp;
              animation-duration: 500ms;
              animation-delay: 300ms;
            }
          }
          .title {
            padding: 2rem;
            display: flex;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 500ms;
            &:hover {
              background: #ddd;
            }
            h4 {
              font-weight: 700;
              margin: 0;
              flex:1;
              span {
                position: relative;
                &:after {
                  content: "";
                  position: absolute;
                  top: 50%;
                  width: 0.6rem;
                  height: 0.6rem;
                  background: transparent;
                  border-top: 0.2rem solid #333;
                  border-right:0.2rem solid #333;
                  box-shadow: 0 0 0 lightgray;
                  transition: all 200ms ease;
                  right: -2rem;
                  transform: translate3d(0,-50%,0) rotate(45deg);
                }
                &.active:after {
                  transform: translate3d(0,-50%,0) rotate(135deg);
                }
              }
            }
            p {margin: 0; font-weight: 500;}
            p span {font-weight: 100;}
          }

          .options {
            & > div {
              padding: 2rem;
              margin: 0.5rem 0;
              background: #ddd;
              cursor: pointer;
              transition: all 500ms;
              &:hover {
                background: #ccc;
              }
              &.active {
               background: #3fa9f5;
               color: #fff;
              }
            }
          }

          @keyframes slideUp {
            from {transform: translateY(25rem);opacity: 0;}
            to {transform: translateY(0); opacity: 1;}
          }
        `}</style>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterTrailsMenu)
