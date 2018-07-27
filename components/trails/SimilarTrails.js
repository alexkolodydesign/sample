import axios from 'axios'
import Link from 'next/link'

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
          {this.state.trails && !this.state.trails.length &&
            <div className="trail">
              <Link href={`/trails/${this.state.trails.slug}`}>
                <a
                  style={{backgroundImage: `url(${this.state.trails.custom_data.media.pictures[0] ? this.state.trails.custom_data.media.pictures[0].sizes.medium : "https://placehold.it/75x75?text=unavailable"})`, backgroundPosition: "center", backgroundSize: "cover"}}
                >
                </a>
              </Link>
              <div className="details">
                <h4><Link href={`/trails/${this.state.trails.slug}`}><a dangerouslySetInnerHTML={{__html: this.state.trails.title.rendered}} /></Link></h4>
                <p><span>{this.state.trails.custom_data.length} Miles</span></p>
                {this.state.trails.custom_data.highlights &&
                  <p>Highlights:
                    {this.state.trails.custom_data.highlights && this.state.trails.custom_data.highlights.map((highlight, index, k) => {
                      if(index < this.state.trails.custom_data.highlights.length - 1) {
                        return <span key={k}> {highlight.label},</span>
                      } else {
                        return <span key={k}> {highlight.label}</span>
                      }
                    }
                  )}</p>
                }
                {this.state.trails.custom_data.difficulty.defaultDifficulty.value && <p><span>{this.state.trails.custom_data.difficulty.defaultDifficulty.label}</span></p>}
                {this.state.trails.custom_data.region && <p><span>{this.state.trails.custom_data.region} Region</span></p>}
              </div>
              <div className="trail_type">
                <img src="/static/images/menu/hiking.svg" alt="Select Hiking Trails" className={!this.state.trails.custom_data.recommendedUse.some((el) => el.value == 'hiking') && "inactive"} />
                <img src="/static/images/menu/biking.svg" alt="Select Biking Trails" className={!this.state.trails.custom_data.recommendedUse.some((el) => el.value == 'biking') && "inactive"} />
                <img src="/static/images/menu/horse.svg" alt="Select Equestrian Trails" className={!this.state.trails.custom_data.recommendedUse.some((el) => el.value == 'equestrian') && "inactive"} />
                <img src="/static/images/menu/atv.svg" alt="Select OHV Trails" className={!this.state.trails.custom_data.recommendedUse.some((el) => el.value == 'ohv') && "inactive"} />
              </div>
            </div>

          }

          {this.state.trails && this.state.trails.length > 1 && this.state.trails.map((trail, k) => {
            <div className="trail">
              <div className="details">
                <Link href={`/trails/${trail.slug}`}>
                  <a
                    style={{backgroundImage: `url(${trail.custom_data.media.pictures[0] ? trail.custom_data.media.pictures[0].sizes.medium : "https://placehold.it/75x75?text=unavailable"})`, backgroundPosition: "center", backgroundSize: "cover"}}
                  >
                  </a>
                </Link>
                <h4><Link href={`/trails/${trail.slug}`}><a dangerouslySetInnerHTML={{__html: trail.title.rendered}} /></Link></h4>
                <p><span>{trail.custom_data.length} Miles</span></p>
                {trail.custom_data.highlights &&
                  <p>Highlights:
                    {trail.custom_data.highlights && trail.custom_data.highlights.map((highlight, index, k) => {
                      if(index < trail.custom_data.highlights.length - 1) {
                        return <span key={k}> {highlight.label},</span>
                      } else {
                        return <span key={k}> {highlight.label}</span>
                      }
                    }
                  )}</p>
                }
                {trail.custom_data.difficulty.defaultDifficulty.value && <p><span>{trail.custom_data.difficulty.defaultDifficulty.label}</span></p>}
                {trail.custom_data.region && <p><span>{trail.custom_data.region} Region</span></p>}
              </div>
              <div className="trail_type">
                <img src="/static/images/menu/hiking.svg" alt="Select Hiking Trails" className={!trail.custom_data.recommendedUse.some((el) => el.value == 'hiking') && "inactive"} />
                <img src="/static/images/menu/biking.svg" alt="Select Biking Trails" className={!trail.custom_data.recommendedUse.some((el) => el.value == 'biking') && "inactive"} />
                <img src="/static/images/menu/horse.svg" alt="Select Equestrian Trails" className={!trail.custom_data.recommendedUse.some((el) => el.value == 'equestrian') && "inactive"} />
                <img src="/static/images/menu/atv.svg" alt="Select OHV Trails" className={!trail.custom_data.recommendedUse.some((el) => el.value == 'ohv') && "inactive"} />
              </div>
            </div>

          })}

        </div>
        <style jsx>{`
          .container {
            padding: 1.5rem 3rem 3rem 3rem;
            background-image: linear-gradient(rgba(255,255,255,0.98), rgba(255,255,255,0.98)), url(/static/images/background-pattern.svg);
          }
          .similar_trails {
            height: 15rem;
            overflow-y: scroll;
          }
          h2 {
            text-transform: uppercase;
            margin: 0.25rem 0;
          }
          .trail {
            background: #eee;
            display: grid;
            grid-template-columns: 10rem 1fr 6.5rem;
            margin: 0 0 1rem;
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
        `}</style>
      </div>
    )
  }
}
