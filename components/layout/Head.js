import Head from 'next/head'

const HeadComponent = props => (
  <Head>
    <title>{props.title ? props.title + ' | Washington County Trails' : 'Washington County Trails'}</title>
    <meta name="description" content={props.description} />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="theme-color" content="#55a5dc" />
    <meta name="msapplication-TileColor" content="#55a5dc" />

    <meta property="og:description" content={props.description} />
    <meta property="og:title" content={props.title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://trails.visitstgeorge.com" />
    <meta property="og:site_name" content="Washington County Trails" />
    {props.ogImage ? (
      props.ogImage
    ) : (
      <meta
        property="og:image"
        content=""
      />
    )}
  </Head>
)

HeadComponent.defaultProps = {
  description:
    "Description of the Washington Trails Web App."
};

export default HeadComponent;
