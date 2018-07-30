export default class Difficulty extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const difficulty = this.props.difficulty
    return (
      <div>
        <div className="difficulty">
          {difficulty.hikingDifficulty &&
            <p>Hiking Difficulty:
              <img src={`/static/images/trail/difficulty/${difficulty.hikingDifficulty.value}.png`} alt={`${difficulty.hikingDifficulty.value} Difficulty`} />
              <span>{difficulty.hikingDifficulty.label}</span>
            </p>
          }
          {difficulty.bikingDifficulty &&
            <p>Biking Difficulty:
              <img src={`/static/images/trail/difficulty/${difficulty.bikingDifficulty.value}.png`} alt={`${difficulty.bikingDifficulty.value} Difficulty`} />
              <span>{difficulty.bikingDifficulty.label}</span>
            </p>
          }
          {difficulty.equestrianDifficulty &&
            <p>Equestrian Difficulty:
              <img src={`/static/images/trail/difficulty/${difficulty.equestrianDifficulty.value}.png`} alt={`${difficulty.equestrianDifficulty.value} Difficulty`} />
              <span>{difficulty.equestrianDifficulty.label}</span>
            </p>
          }
          {difficulty.ohvDifficulty &&
            <p>OHV Difficulty:
              <img src={`/static/images/trail/difficulty/${difficulty.ohvDifficulty.value}.png`} alt={`${difficulty.ohvDifficulty.value} Difficulty`} />
              <span>{difficulty.ohvDifficulty.label}</span>
            </p>
          }
          {difficulty.defaultDifficulty &&
            <p>Difficulty:
              <img src={`/static/images/trail/difficulty/${difficulty.defaultDifficulty.value}.png`} alt={`${difficulty.defaultDifficulty.value} Difficulty`} />
              <span>{difficulty.defaultDifficulty.label}</span>
            </p>
          }

        </div>
        <style jsx>{`
          .difficulty {
            p {
              margin: 3px 0 0;
              font-weight: bold;
            }
            img {
              margin: 0 3px 0 2px;
              vertical-align: -2px;
              max-height: 1.25rem;
            }
            span {
              font-weight: normal;
            }
          }
        `}</style>
      </div>
    )
  }
}
