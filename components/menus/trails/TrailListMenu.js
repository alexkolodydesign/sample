import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { trailsShape, filtersShape } from '../../../utils/propTypes';
import filterAction from '../../../utils/filterActions';
import regions from '../../../data/regions';
import Trail from './Trail';

class TrailListMenu extends React.Component {
  state = { filteredTrails: [] };

  componentDidMount = () => {
    const { trails, filters } = this.props;
    this.setState({
      filteredTrails: filterAction(trails, filters, true)
    });
  };

  search = e => {
    const { trails, filters } = this.props;
    const searchTerm = e.target.value.toLowerCase();
    const searchFilteredTrails = filterAction(trails, filters, true).filter(trail =>
      trail.title.rendered.toLowerCase().includes(searchTerm)
    );
    this.setState({ filteredTrails: searchFilteredTrails });
  };

  render() {
    const { highlightedRegion, trailsListMenu, toggleMenus } = this.props;
    const { filteredTrails } = this.state;
    const selectedRegion = regions.regions.find(
      region => region.regionName === highlightedRegion
    );
    return (
      <div className={trailsListMenu === 'exiting' ? 'exiting menu' : 'menu'}>
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
          {filteredTrails
            .filter(trail => {
              // Only show trails in selected region
              if (selectedRegion) return trail.regions.includes(selectedRegion.id);
              return true;
            })
            .map(trail => (
              <Trail trail={trail} key={trail.slug} />
            ))}
        </div>
        <style jsx>
          {`
            h3 {
              text-transform: uppercase;
              margin: 0 0 0 1rem;
              color: #fff;
            }
            .menu {
              left: -2rem;
              right: -2rem;
              bottom: -2.35rem;
              top: initial;

              z-index: 10;
              padding: 1rem 0.5rem 2rem 0.5rem;
              border-top-left-radius: 1rem;
              border-top-right-radius: 1rem;
              background: #3fa9f5;

              height: 40rem;
              position: absolute;
              overflow: hidden;
              animation-name: slideUp;
              animation-duration: 500ms;
              &.exiting {
                transition: 500ms;
                transform: translateY(25rem);
                opacity: 0;
              }
            }
            @keyframes slideUp {
              from {
                transform: translateY(25rem);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
            .search {
              margin-top: 1rem;
              background: #f2f2f2;
              form {
                display: flex;
                padding: 0.5rem;
                input {
                  width: 100%;
                  background: #fff;
                  border: none;
                  padding: 1rem 0.5rem;
                }
              }
            }
            .trails {
              background-image: linear-gradient(
                  rgba(255, 255, 255, 0.98),
                  rgba(255, 255, 255, 0.98)
                ),
                url(/static/images/background-pattern.svg);
              padding: 0 0.5rem;
              height: calc(100% - 5rem);
              overflow-y: scroll;
            }
            .close {
              color: #3fa9f5;
              background: #fff;
              border: none;
              position: absolute;
              right: 3rem;
              top: 1rem;
              padding: 0.5rem 0.5rem;
              border-radius: 100%;
              line-height: 1rem;
              font-weight: 700;
              cursor: pointer;
              transition: all 500ms;
              opacity: 0.5;
              &:hover {
                opacity: 1;
              }
            }
            @media screen and (min-width: 768px) {
              .menu {
                left: 0;
                top: -45.5rem;
                z-index: -1;
                width: 30rem;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

TrailListMenu.propTypes = {
  toggleMenus: PropTypes.func.isRequired,
  trails: trailsShape.isRequired,
  filters: filtersShape.isRequired,
  highlightedRegion: PropTypes.string.isRequired,
  trailsListMenu: PropTypes.bool.isRequired
};

// Redux
const mapStateToProps = state => ({
  filters: state.map.filters,
  highlightedRegion: state.map.highlightedRegion,
  trailsListMenu: state.map.menus.trailsListMenu,
  trails: state.trails
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
