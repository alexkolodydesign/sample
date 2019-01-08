import React from 'react';
import PropTypes from 'prop-types';
import { difficultyShape } from '../../lib/propTypes';

const Difficulty = ({ difficulty, mainMap }) => (
  <div>
    <div className="difficulty">
      {difficulty.hikingDifficulty.value && difficulty.hikingDifficulty.value !== 'none' && (
        <p>
          Hiking Difficulty
          {mainMap && `:`}
          {!mainMap && <br />}
          <img
            src={`/static/images/trail/difficulty/${
              difficulty.hikingDifficulty.value
            }.png`}
            alt={`${difficulty.hikingDifficulty.value} Difficulty`}
          />
          <span>{difficulty.hikingDifficulty.label}</span>
        </p>
      )}
      {difficulty.bikingDifficulty.value && difficulty.bikingDifficulty.value !== 'none' && (
        <p>
          Biking Difficulty
          {mainMap && `:`}
          {!mainMap && <br />}
          <img
            src={`/static/images/trail/difficulty/${
              difficulty.bikingDifficulty.value
            }.png`}
            alt={`${difficulty.bikingDifficulty.value} Difficulty`}
          />
          <span>{difficulty.bikingDifficulty.label}</span>
        </p>
      )}
      {difficulty.equestrianDifficulty.value &&
        difficulty.equestrianDifficulty.value !== 'none' && (
          <p>
            Equestrian Difficulty
            {mainMap && `:`}
            {!mainMap && <br />}
            <img
              src={`/static/images/trail/difficulty/${
                difficulty.equestrianDifficulty.value
              }.png`}
              alt={`${difficulty.equestrianDifficulty.value} Difficulty`}
            />
            <span>{difficulty.equestrianDifficulty.label}</span>
          </p>
        )}
      {difficulty.ohvDifficulty.value && difficulty.ohvDifficulty.value !== 'none' && (
        <p>
          OHV Difficulty
          {mainMap && `:`}
          {!mainMap && <br />}
          <img
            src={`/static/images/trail/difficulty/${difficulty.ohvDifficulty.value}.png`}
            alt={`${difficulty.ohvDifficulty.value} Difficulty`}
          />
          <span>{difficulty.ohvDifficulty.label}</span>
        </p>
      )}
      {difficulty.defaultDifficulty.value &&
        difficulty.defaultDifficulty.value !== 'none' &&
        difficulty.hikingDifficulty.value === 'none' &&
        difficulty.bikingDifficulty.value === 'none' &&
        difficulty.equestrianDifficulty.value === 'none' &&
        difficulty.ohvDifficulty.value === 'none' && (
          <p>
            Difficulty
            {mainMap && `:`}
            {!mainMap && <br />}
            <img
              src={`/static/images/trail/difficulty/${
                difficulty.defaultDifficulty.value
              }.png`}
              alt={`${difficulty.defaultDifficulty.value} Difficulty`}
            />
            <span>{difficulty.defaultDifficulty.label}</span>
          </p>
        )}
    </div>
    <style jsx>
      {`
        .difficulty {
          p {
            margin: 3px 0 1em;
            color: ${mainMap ? '#777777' : '#000000'};
            text-transform: ${mainMap ? 'inherit' : 'uppercase'};
            font-weight: ${mainMap ? 'bold' : '500'};
            span {
              font-weight: 100;
              text-transform: initial;
            }
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
      `}
    </style>
  </div>
);

Difficulty.propTypes = {
  difficulty: difficultyShape.isRequired,
  mainMap: PropTypes.bool
};

Difficulty.defaultProps = {
  mainMap: false
};

export default Difficulty;
