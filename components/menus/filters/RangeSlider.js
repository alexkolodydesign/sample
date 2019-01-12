import React from 'react';
import PropTypes from 'prop-types';

export default class RangeSlider extends React.Component {
  state = { length: 0 };

  change = e => {
    const { action } = this.props;
    action(Number(e.target.value));
    this.setState({ length: Number(e.target.value) });
  };

  render() {
    const { length } = this.state;
    const milesMessage = () => {
      if (length === null) return 'No Length Set';
      if (length === 0) return 'Less than a mile';
      if (length !== 0 && length <= 49) return `${length} miles`;
      if (length === 50) return 'Over 50 miles';
      return '';
    };
    return (
      <div>
        <p>{milesMessage()}</p>
        <input
          type="range"
          min="0"
          max="50"
          list="tickmarks"
          defaultValue={0}
          onChange={this.change}
        />
        <datalist id="tickmarks">
          <option value={0} label="Less than a mile" />
          <option value={10} />
          <option value={20} />
          <option value={30} />
          <option value={40} />
          <option value={50} label="Over 50 miles" />
        </datalist>
        <p>
          <button onClick={() => this.change({ target: { value: null } })} type="button">
            Clear Filter
          </button>
        </p>
        <style jsx>
          {`
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
              &:hover {
                color: #333;
                background: #ccc;
              }
            }
            input[type='range'] {
              width: 100%;
              color: #000;
            }
          `}
        </style>
      </div>
    );
  }
}

RangeSlider.propTypes = {
  action: PropTypes.func.isRequired
};
