import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BeatLoader } from 'react-spinners';
import TrailsData from '../../services/TrailsData';
import { filtersShape } from '../../../utils/propTypes';
import filterAction from '../../../utils/filterActions';
import regions from '../../../data/regions';
import Trail from './Trail';
import TrailListMenuStyles from './TrailListMenu.styles';

class TrailListMenu extends React.Component {
  state = { searchTerm: '' };

  search = e => {
    const searchTerm = e.target.value.toLowerCase();
    this.setState({ searchTerm });
  };

  render() {
    const { highlightedRegion, trailsListMenu, toggleMenus, filters } = this.props;
    const { searchTerm } = this.state;
    const selectedRegion = regions.regions.find(
      region => region.regionName === highlightedRegion
    );
    return (
      <TrailListMenuStyles
        className={trailsListMenu === 'exiting' ? 'exiting menu' : 'menu'}
      >
        <h3>Trail List</h3>
        <button className="close" onClick={toggleMenus} type="button">
          X
        </button>
        <div className="search">
          <form onChange={this.search}>
            <input type="text" placeholder="Search here…" />
          </form>
        </div>
        <div className="trails">
          <TrailsData>
            {({ loading, trails }) => {
              if (loading) return <BeatLoader color="#0098e5" />;
              const filteredTrails = filterAction(trails, filters, true);
              return filteredTrails
                .filter(trail => {
                  // Only show trails in selected region
                  if (selectedRegion) return trail.regions.includes(selectedRegion.id);
                  return true;
                })
                .filter(
                  trail =>
                    // Filter by search term
                    trail.title.rendered.toLowerCase().includes(searchTerm) ||
                    searchTerm === ''
                )
                .map(trail => <Trail trail={trail} key={trail.slug} />);
            }}
          </TrailsData>
        </div>
      </TrailListMenuStyles>
    );
  }
}

TrailListMenu.propTypes = {
  toggleMenus: PropTypes.func.isRequired,
  filters: filtersShape.isRequired,
  highlightedRegion: PropTypes.string.isRequired,
  trailsListMenu: PropTypes.bool.isRequired
};

// Redux
const mapStateToProps = state => ({
  filters: state.map.filters,
  highlightedRegion: state.map.highlightedRegion,
  trailsListMenu: state.map.menus.trailsListMenu
});
const mapDispatchToProps = dispatch => ({
  toggleMenus: () =>
    dispatch({
      type: 'TOGGLE_MENUS',
      menus: {
        filterTrailsMenu: false,
        trailsListMenu: false,
        optionsMenu: false
      }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrailListMenu);
