const Difficulty = props =>
  <div>
    <div className="difficulty">
        {props.difficulty.map((type, k) => {
          if (type == "defaultDifficulty") {
            return
              <p>Difficulty:
                <img src={`/static/images/trail/difficulty/${type.value}.png`} alt={`${type.value} Difficulty`} />
                <span>{type.label}</span>
              </p>
          } else if (type == "hikingDifficulty") {
            return
              <p>Hiking Difficulty:
                <img src={`/static/images/trail/difficulty/${type.value}.png`} alt={`${type.value} Difficulty`} />
                <span>{type.label}</span>
              </p>
          } else if (type == "bikingDifficulty") {
            return
              <p>Biking Difficulty:
                <img src={`/static/images/trail/difficulty/${type.value}.png`} alt={`${type.value} Difficulty`} />
                <span>{type.label}</span>
              </p>
          } else if (type == "equestrianDifficulty") {
            return
              <p>Equestrian Difficulty:
                <img src={`/static/images/trail/difficulty/${type.value}.png`} alt={`${type.value} Difficulty`} />
                <span>{type.label}</span>
              </p>
          } else if (type == "ohvDifficulty") {
            return
              <p>OHV Difficulty:
                <img src={`/static/images/trail/difficulty/${type.value}.png`} alt={`${type.value} Difficulty`} />
                <span>{type.label}</span>
              </p>
          } else {
            return ""
          }
        })}
    </div>
    <style jsx>{`
      .difficulty {
        img {
        }
      }
    `}</style>
  </div>

  export default Difficulty
