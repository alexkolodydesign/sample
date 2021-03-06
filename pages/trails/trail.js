import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import sanitizeHtml from 'sanitize-html-react';
import ScrollToTop from 'react-scroll-up';
import getHostUrl from '../../utils/getHostUrl';
import Head from '../../components/shared/Head';
import TrailSidebar from '../../components/trails/TrailSidebar';
import TrailMap from '../../components/maps/TrailMap';
import SimilarTrails from '../../components/trails/SimilarTrails';
import NearbyTrails from '../../components/trails/NearbyTrails';
import TrailMedia from '../../components/trails/media/TrailMedia';
import MainMenu from '../../components/menus/MainMenu';
import { trailShape } from '../../utils/propTypes';
import TrailStyles from '../../components/trails/Trails.styles';
import { BackButton } from '../../components/shared/Button.styles';
import Region from '../../data/regions';

var regions = Region.regions;

const Trail = ({ trail, region_info, error }) => (
  <TrailStyles>
    {error ? (
      <div className="wrapper">
        It appears this Trail no longer exists or another error has occurred.
      </div>
    ) : (
      <div>
        <Head />
        <div className="wrapper headerWrapper">
          <Link href="/">
            <a href="/" className="back_button" style={{ paddingTop: '3rem' }}>
              <BackButton type="button">&lt; Back to map</BackButton>
            </a>
          </Link>

          <h1>{region_info && region_info.markerIcon ? ReactHtmlParser(`<img src='${region_info.markerIcon}' class='trail-region-icon' style='width:60px;vertical-align: middle;'} } />`) : "" } {ReactHtmlParser(sanitizeHtml(trail.title.rendered))}</h1>

        </div>
        <div className="wrapper trail">
          <TrailSidebar trail={trail} />
          <TrailMap trail={trail} />
        </div>
        <div className="wrapper more_trails">
          {trail.custom_data.similarTrails.length > 0 && (
            <SimilarTrails similarTrails={trail.custom_data.similarTrails} />
          )}
          {trail.custom_data.trailsNearby.length > 0 && (
            <NearbyTrails nearbyTrails={trail.custom_data.trailsNearby} />
          )}
        </div>
        <TrailMedia trailName={trail.title.rendered} media={trail.custom_data.media} />
        <ScrollToTop
          showUnder={160}
          style={{ background: '#4d4e4e', padding: '0.75rem' }}
        >
          <img
            width="20"
            height="20"
            src="/static/images/scrollup.svg"
            alt="scroll to top"
          />
        </ScrollToTop>
        <MainMenu trailPage />
      </div>
    )}
  </TrailStyles>
);

Trail.getInitialProps = async props => {
  const hostUrl = getHostUrl(props);
  const slug = props.asPath.split('/')[2];
  try {
    const res = await fetch(`${hostUrl}/api/trail/${slug}`);
    const { trail } = await res.json();
    const region_id = trail.regions[0];
    let region_info = regions.filter(ri => ri.id === region_id)
    region_info = region_info && region_info[0] ? region_info[0] : []
    return { trail, region_info };
  } catch (e) {
    // console.log(e);
    return { error: true };
  }
};

Trail.propTypes = {
  trail: trailShape.isRequired,
  error: PropTypes.bool
};

Trail.defaultProps = {
  error: false
};

// Redux
const mapStateToProps = state => ({ trails: state.trails });

export default connect(
  mapStateToProps,
  null
)(Trail);
