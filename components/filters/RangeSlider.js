export default class RangeSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {length: 0}
    this.change = this.change.bind(this)
  }
  change(e) {
    this.props.action(e.target.value)
    this.setState({length: e.target.value})
  }
  render() {
    const milesMessage = () => {
      if (this.state.length === null) return "No Length Set"
      if (this.state.length == 0) return "Less than a mile"
      if (this.state.length != 0 && this.state.length <= 49) return this.state.length + " miles"
      if (this.state.length == 50) return "Over 50 miles"
      return ""
    }
    return (
      <div>
        <p>{milesMessage()}</p>
        <input type="range" min="0" max="50" list="tickmarks" defaultValue={0} onChange={this.change} />
        <datalist id="tickmarks">
          <option value="0" label="Less than a mile" />
          <option value="10" />
          <option value="20" />
          <option value="30" />
          <option value="40" />
          <option value="50" label="Over 50 miles" />
        </datalist>
        <p><span onClick={()=>this.change({target:{value:null}})}>Clear Filter</span></p>
        <style jsx>{`
            div {
              padding: 1rem;
            }
            p {
              text-align: center;
            }
            span {
              cursor: pointer;
              background: #ddd;
              text-align: center;
              padding: 0.5rem;
              margin: 0 auto;
              border-radius: 0.5rem;
              font-size: 1.2rem;
              text-transform: uppercase;
              color: #777;
              transition: all 500ms;
              &:hover {color: #333;background: #ccc;}
            }
            input[type="range"] {
              width: 100%;
              color: #000;
            }
        `}</style>
      </div>
    )
  }
}
