import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import sanitizeHtml from 'sanitize-html-react';
import { trailsShape } from '../../utils/propTypes';

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
      <div className="container">
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
        <style jsx>
          {`
            .container {
              padding: 1.5rem 3rem 3rem 3rem;
              background-image: linear-gradient(
                  rgba(255, 255, 255, 0.98),
                  rgba(255, 255, 255, 0.98)
                ),
                url(/static/images/background-pattern.svg);
            }
            .similar_trails {
              height: 15rem;
              overflow-y: scroll;
            }
            h2 {
              text-transform: uppercase;
              margin: 0.25rem 0;
            }
            .trail {
              background: #eee;
              display: grid;
              grid-template-columns: 10rem 1fr 6.5rem;
              margin: 0 0 1rem;
              img {
                max-width: 100%;
                height: auto;
              }
            }
            .details {
              padding: 0.25rem 1rem 1rem 1rem;
              h4 {
                margin: 0;
                font-weight: 700;
                a {
                  text-decoration: none;
                  color: inherit;
                }
              }
              p {
                margin: 0;
                font-weight: 500;
              }
              p span {
                font-weight: 100;
              }
            }
            .trail_type {
              display: grid;
              grid-template: 2.5rem 2.5rem / 2.5rem 2.5rem;
              align-self: center;
              img {
                width: 3.5rem;
              }
            }
            .inactive {
              opacity: 0.25;
              filter: grayscale();
            }
          `}
        </style>
      </div>
    );
  }
}

SimilarTrails.propTypes = {
  similarTrails: trailsShape.isRequired
};
