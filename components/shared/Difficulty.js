import React from 'react';
import PropTypes from 'prop-types';
import { difficultyShape } from '../../utils/propTypes';
import DifficultyStyles from './Difficulty.styles';

const Difficulty = ({ difficulty, mainMap }) => (
  <DifficultyStyles>
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
  </DifficultyStyles>
);

Difficulty.propTypes = {
  difficulty: difficultyShape.isRequired,
  mainMap: PropTypes.bool
};

Difficulty.defaultProps = {
  mainMap: false
};

export default Difficulty;
