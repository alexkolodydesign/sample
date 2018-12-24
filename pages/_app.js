import React from 'react';
import App, { Container } from 'next/app';
import { ThemeProvider } from 'emotion-theming';
import theme from '../lib/theme';

export class Washco extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
        <style jsx global>
          {`
            html {
              font-size: 62.5%;
              padding: 0;
              margin: 0;
            }
            body {
              font-family: 'Lato', sans-serif;
              font-size: 1.4rem;
              padding: 0;
              margin: 0;
            }
            main {
              min-height: calc(100vh - 74.4rem);
            }
            .wrapper {
              max-width: 120rem;
              margin: 0 auto;
            }
            ::-webkit-scrollbar {
              width: 12px;
              background: #ccc;
              -webkit-border-radius: 5px;
              border-radius: 5px;
            }
            ::-webkit-scrollbar-track {
              -webkit-border-radius: 5px;
              border-radius: 5px;
            }
            ::-webkit-scrollbar-thumb {
              -webkit-border-radius: 5px;
              border-radius: 5px;
              background: #4d4e4e;
            }
            ::-webkit-scrollbar-thumb:window-inactive {
              background: rgba(77, 78, 78, 0.4);
            }
            /* latin-ext */
            @font-face {
              font-family: 'Lato';
              font-style: normal;
              font-weight: 300;
              src: local('Lato Light'), local('Lato-Light'),
                url(https://fonts.gstatic.com/s/lato/v14/S6u9w4BMUTPHh7USSwaPGR_p.woff2)
                  format('woff2');
              unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
                U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            /* latin */
            @font-face {
              font-family: 'Lato';
              font-style: normal;
              font-weight: 300;
              src: local('Lato Light'), local('Lato-Light'),
                url(https://fonts.gstatic.com/s/lato/v14/S6u9w4BMUTPHh7USSwiPGQ.woff2)
                  format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
                U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
                U+2215, U+FEFF, U+FFFD;
            }
            /* latin-ext */
            @font-face {
              font-family: 'Lato';
              font-style: normal;
              font-weight: 400;
              src: local('Lato Regular'), local('Lato-Regular'),
                url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjxAwXjeu.woff2)
                  format('woff2');
              unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
                U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            /* latin */
            @font-face {
              font-family: 'Lato';
              font-style: normal;
              font-weight: 400;
              src: local('Lato Regular'), local('Lato-Regular'),
                url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXg.woff2)
                  format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
                U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
                U+2215, U+FEFF, U+FFFD;
            }
            /* latin-ext */
            @font-face {
              font-family: 'Lato';
              font-style: normal;
              font-weight: 700;
              src: local('Lato Bold'), local('Lato-Bold'),
                url(https://fonts.gstatic.com/s/lato/v14/S6u9w4BMUTPHh6UVSwaPGR_p.woff2)
                  format('woff2');
              unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
                U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            /* latin */
            @font-face {
              font-family: 'Lato';
              font-style: normal;
              font-weight: 700;
              src: local('Lato Bold'), local('Lato-Bold'),
                url(https://fonts.gstatic.com/s/lato/v14/S6u9w4BMUTPHh6UVSwiPGQ.woff2)
                  format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
                U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
                U+2215, U+FEFF, U+FFFD;
            }
          `}
        </style>
      </Container>
    );
  }
}
export default Washco;
