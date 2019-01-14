/* eslint-disable react/no-danger */
import React from 'react';
import Head from 'next/head';
import Proptypes from 'prop-types';
import { withRouter } from 'next/router';

const HeadComponent = ({ title, description, ogImage, children, router }) => (
  <Head>
    <title>{title ? `${title} | Washington County Trails` : title}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="theme-color" content="#55a5dc" />
    <meta name="msapplication-TileColor" content="#55a5dc" />
    {/* TODO: Add favicon link */}

    <meta property="og:description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://swutahtrails.com" />
    <meta property="og:site_name" content="Washington County Trails" />
    <meta property="og:image" content={ogImage} />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js" />
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MFQ7DJ4');`
      }}
    />
    <script src="https://www.googletagmanager.com/gtag/js?id=UA-130505850-1" />
    <script
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-130505850-1');`
      }}
    />

    {/* Page view custom event - GTM */}
    <script
      dangerouslySetInnerHTML={{
        __html: `if(!dataLayer){dataLayer=[]}dataLayer.push({'event':'pageview'});dataLayer.push({path:'${
          router.asPath
        }'})`
      }}
    />
    {children}
  </Head>
);

HeadComponent.propTypes = {
  description: Proptypes.string,
  title: Proptypes.string,
  ogImage: Proptypes.string,
  children: Proptypes.node,
  router: Proptypes.shape({
    asPath: Proptypes.string
  }).isRequired
};

HeadComponent.defaultProps = {
  title: 'Washington County Trails',
  description: 'Description of the Washington Trails Web App.',
  ogImage: '',
  children: null
};

export default withRouter(HeadComponent);
