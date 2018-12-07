import Head from 'next/head'
import { withRouter } from 'next/router'

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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js" />
    <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MFQ7DJ4');`}} />

    {/* Page view custom event - GTM */}
    <script dangerouslySetInnerHTML={{__html: `if(!dataLayer){dataLayer=[]}dataLayer.push({'event':'pageview'});dataLayer.push({path:'${props.router.asPath}'})`}} />
    {props.children}
  </Head>
)

HeadComponent.defaultProps = {
  description:
    "Description of the Washington Trails Web App."
};

export default withRouter(HeadComponent)
