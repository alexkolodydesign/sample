import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RangeSlider from './RangeSlider';
import { trailTypeShape } from '../../../utils/propTypes';
import OptionStyles from './Option.styles';

const Option = ({ title, trailType, selected, range, action, options, regions }) => {
  const [menu, setMenu] = useState(false);
  const selections = select => (
    <span key={select}>
      {select}
      <br />
    </span>
  );
  return (
    <OptionStyles>
      <button type="button" className="title" onClick={() => setMenu(!menu)}>
        <h4>
          <span className={menu ? 'active' : undefined}>{title}</span>
        </h4>
        <p>
          <span>
            {trailType || regions ? selected.split(' ').map(selections) : selected}
          </span>
        </p>
      </button>
      {menu && (
        <div className="options">
          {range ? (
            <RangeSlider action={action} />
          ) : (
            <>
              {options &&
                options.map(option => {
                  if (action) {
                    let style;
                    if (trailType)
                      style = trailType[option.toLowerCase()] === true ? 'active' : null;
                    else if (regions)
                      style = regions[option.toLowerCase()] === true ? 'active' : null;
                    else
                      style =
                        selected.toLowerCase() === option.toLowerCase() ? 'active' : null;
                    return (
                      <button
                        type="button"
                        key={option.toLowerCase()}
                        onClick={() => action(option.toLowerCase())}
                        className={style}
                      >
                        {option}
                      </button>
                    );
                  }
                  return <div key={option}>{option}</div>;
                })}
            </>
          )}
        </div>
      )}
    </OptionStyles>
  );
};

Option.propTypes = {
  title: PropTypes.string.isRequired,
  trailType: trailTypeShape,
  selected: PropTypes.string.isRequired,
  range: PropTypes.bool,
  action: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  regions: PropTypes.shape({
    alpine: PropTypes.bool.isRequired,
    desert: PropTypes.bool.isRequired,
    canyon: PropTypes.bool.isRequired,
    mesa: PropTypes.bool.isRequired,
    urban: PropTypes.bool.isRequired
  })
};

Option.defaultProps = {
  trailType: null,
  regions: null,
  range: false
};

export default Option;
