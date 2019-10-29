import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import TrailList from './trails/TrailList';
import GPS from './GPS';
import Settings from './settings/Settings';
import MainMenuStyles from './MainMenu.styles';
import GeneralData from '../maps/GeneralData';

const SelectTrailType = dynamic(() =>
  import(/* webpackChunkName: "SelectTrailType" */ './SelectTrailType')
);
const FilterTrails = dynamic(() =>
  import(/* webpackChunkName: "FilterTrails" */ './filters/FilterTrails')
);

const MainMenu = ({ trailPage, showSEO }) => (
  <MainMenuStyles trailPage={trailPage}>
    <div className="colors">
      <div className="magenta" />
      <div className="orange" />
      <div className="purple" />
      <div className="aqua" />
    </div>
    <div className="background" />
    <div className="wrapper">
      <div className="footerLogos">
        <img
          className="lifeLogo"
          src="/static/images/UTAH_LIFE_ELEVATED.svg"
          alt="Utah Life Elevated"
        />
        <a href="https://www.greaterzion.com/" target="_blank" rel="noopener noreferrer">
          <img
            src="/static/images/greaterzion-horizontal-black.png"
            alt="Greater Zion, Utah"
          />
        </a>
      </div>
      <div className="menuWrapper">
        {!trailPage && (
          <>
            <SelectTrailType />
            <FilterTrails />
          </>
        )}
        {trailPage && <div />}
        <TrailList />
        <GPS />
        <Settings />
      </div>
    </div>
    {showSEO && <GeneralData />}
    <img
      src="//tag.yieldoptimizer.com/ps/analytics?pxid=54383&"
      width="1"
      height="1"
      alt="optimizerpx"
    />
  </MainMenuStyles>
);

MainMenu.propTypes = {
  trailPage: PropTypes.bool,
  showSEO: PropTypes.bool
};

MainMenu.defaultProps = {
  trailPage: false,
  showSEO: false
};

export default MainMenu;
