import React from 'react';
import PropTypes from 'prop-types';
import RangeSlider from './RangeSlider';
import { trailTypeShape } from '../../../utils/propTypes';
import OptionStyles from './Option.styles';

class Option extends React.Component {
  state = { menu: false };

  toggleMenu = () => {
    this.setState(state => ({
      menu: !state.menu
    }));
  };

  render() {
    const { title, trailType, selected, range, action, options } = this.props;
    const { menu } = this.state;
    const trailTypeSelections = select => (
      <span key={select}>
        {select}
        <br />
      </span>
    );
    return (
      <OptionStyles>
        <button type="button" className="title" onClick={this.toggleMenu}>
          <h4>
            <span className={menu ? 'active' : undefined}>{title}</span>
          </h4>
          <p>
            <span>
              {trailType ? selected.split(' ').map(trailTypeSelections) : selected}
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
                        style =
                          trailType[option.toLowerCase()] === true ? 'active' : null;
                      else
                        style =
                          selected.toLowerCase() === option.toLowerCase()
                            ? 'active'
                            : null;
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
  }
}

Option.propTypes = {
  title: PropTypes.string.isRequired,
  trailType: trailTypeShape,
  selected: PropTypes.string.isRequired,
  range: PropTypes.bool,
  action: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired
};

Option.defaultProps = {
  trailType: null,
  range: false
};

export default Option;
