import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import sanitizeHtml from 'sanitize-html-react';
import { trailsShape } from '../../utils/propTypes';
import SimilarTrailsStyles from './SimilarTrails.styles';

export default class SimilarTrails extends React.Component {
  state = { trails: false };

  componentDidMount = () => {
    this.getTrailData();
  };

  getTrailData = async () => {
    const { similarTrails } = this.props;
    const trails = [];
    for (let i = 0; i < similarTrails.length; i += 1) {
      trails.push(axios.get(`/api/trail/${similarTrails[i].post_name}`));
    }
    this.setState({ trails: await Promise.all(trails) });
  };

  render() {
    const { trails } = this.state;
    if (!trails) return null;
    return (
      <SimilarTrailsStyles className="container">
        <h2>Similar to This Trail:</h2>
        <div className="similar_trails">
          {trails &&
            trails.length > 1 &&
            trails.map(trail => {
              // trail = trail.trail;
              const recommendedUse =
                trail.custom_data.recommendedUse !== ''
                  ? trail.custom_data.recommendedUse
                  : [];
              return (
                <div className="trail" key={trail.slug}>
                  <div className="details">
                    <Link href={`/trails/${trail.slug}`}>
                      <div
                        style={{
                          backgroundImage: `url(${
                            trail.custom_data.media.pictures[0]
                              ? trail.custom_data.media.pictures[0].sizes.medium
                              : 'https://placehold.it/75x75?text=unavailable'
                          })`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover'
                        }}
                      />
                    </Link>
                    <h4>
                      <Link href={`/trails/${trail.slug}`}>
                        <a href={`/trails/${trail.slug}`}>
                          {ReactHtmlParser(sanitizeHtml(trail.title.rendered))}
                        </a>
                      </Link>
                    </h4>
                    <p>
                      <span>{trail.custom_data.length} Miles</span>
                    </p>
                    {trail.custom_data.highlights && (
                      <p>
                        Highlights:
                        {trail.custom_data.highlights &&
                          trail.custom_data.highlights.map((highlight, index) => {
                            if (index < trail.custom_data.highlights.length - 1) {
                              return (
                                <span key={highlight.value}> {highlight.label},</span>
                              );
                            }
                            return <span key={highlight.value}> {highlight.label}</span>;
                          })}
                      </p>
                    )}
                    {trail.custom_data.difficulty.defaultDifficulty.value && (
                      <p>
                        <span>
                          {trail.custom_data.difficulty.defaultDifficulty.label}
                        </span>
                      </p>
                    )}
                    {trail.custom_data.region && (
                      <p>
                        <span>{trail.custom_data.region} Region</span>
                      </p>
                    )}
                  </div>
                  <div className="trail_type">
                    <img
                      src="/static/images/menu/hiking.svg"
                      alt="Select Hiking Trails"
                      className={
                        !recommendedUse.some(el => el.value === 'hiking') && 'inactive'
                      }
                    />
                    <img
                      src="/static/images/menu/biking.svg"
                      alt="Select Biking Trails"
                      className={
                        !recommendedUse.some(el => el.value === 'biking') && 'inactive'
                      }
                    />
                    <img
                      src="/static/images/menu/equestrian.svg"
                      alt="Select Equestrian Trails"
                      className={
                        !recommendedUse.some(el => el.value === 'equestrian') &&
                        'inactive'
                      }
                    />
                    <img
                      src="/static/images/menu/ohv.svg"
                      alt="Select OHV Trails"
                      className={
                        !recommendedUse.some(el => el.value === 'ohv') && 'inactive'
                      }
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </SimilarTrailsStyles>
    );
  }
}

SimilarTrails.propTypes = {
  similarTrails: trailsShape.isRequired
};
