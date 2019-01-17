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

const Trail = ({ trail, error }) => (
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
              <button type="button">&lt; Back to map</button>
            </a>
          </Link>

          <h1>{ReactHtmlParser(sanitizeHtml(trail.title.rendered))}</h1>
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
    return { trail };
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
