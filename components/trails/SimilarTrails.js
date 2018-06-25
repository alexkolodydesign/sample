import axios from 'axios'

export default class SimilarTrails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {trails: false}
  }
  async componentDidMount() {
    const {data: trails} = await axios.get(`/api/trail/${this.props.similarTrails.map(trail => trail.post_name + ',')}`)
    this.setState({trails})
  }
  render() {
    return (
      <div className="container">
        <h2>Similar to This Trail:</h2>
        <div className="similar_trails">
          <div className="trail">
            {this.state.trails && !this.state.trails.length &&
              <div>
                {this.state.trails.title.rendered}
                {this.state.trails.custom_data.length}
                {this.state.trails.custom_data.highlights.map((highlight, k) => <span key={k}>{highlight.label}</span>)}
                {this.state.trails.custom_data.difficulty.defaultDifficulty.label}
                {this.state.trails.custom_data.region}
              </div>
            }
            {this.state.trails && this.state.trails.length > 1 && this.state.trails.map((trail, k) => {
              return (
                <div key={k}>
                  {trail.title.rendered}
                  {trail.custom_data.length}
                  {trail.custom_data.highlights.map((highlight, k) => <span key={k}>{highlight.label}</span>)}
                  {trail.custom_data.difficulty.defaultDifficulty.label}
                  {trail.custom_data.region}
                </div>
              )
            })}
          </div>
        </div>
        <style jsx>{`
          .container {
            padding: 1.5rem 3rem 3rem 3rem;
            background: #fff;
          }
          .similar_trails {
            height: 15rem;
            overflow-y: scroll;
            background: #e6e6e6;
          }
          h2 {
            text-transform: uppercase;
            margin: 0.25rem 0;
          }
        `}</style>
      </div>
    )
  }
}
