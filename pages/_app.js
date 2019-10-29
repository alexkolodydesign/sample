import React from 'react';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { ThemeProvider } from 'emotion-theming';
import LoadingScreen from '../components/shared/LoadingScreen';
import { initStore } from '../redux/store';
import theme from '../utils/theme';
import TrailsData from '../components/services/TrailsData';

// Use React Context to store trails data for multiple components
export const TrailsContext = React.createContext();

export class Washco extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <noscript
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MFQ7DJ4" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />`
              }}
            />
            <LoadingScreen />
            <TrailsData>
              {({ loading, trails }) => (
                <TrailsContext.Provider value={{ trails, loading }}>
                  <Component {...pageProps} />
                </TrailsContext.Provider>
              )}
            </TrailsData>
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

// Configure Loader
Router.onRouteChangeStart = () => {
  document.getElementById('loader').style.display = 'flex';
  document.documentElement.style.overflow = 'hidden';
  document.getElementsByTagName('main')[0].style.opacity = '0.1';
};
function removeLoader() {
  document.getElementById('loader').style = 'none';
  document.documentElement.style.overflow = 'inherit';
  const main = document.getElementsByTagName('main');
  if (main && main[0]) {
    main[0].style.opacity = '1';
  }
}
Router.onRouteChangeComplete = () => removeLoader();
Router.onRouteChangeError = () => removeLoader();

Washco.getInitialProps = async ({ Component, ctx }) => {
  // Make sure page components have their getInitialProps ran on server
  // First time users don't have a cookie
  const firstTimeUser = ctx.req
    ? ctx.req.cookies.firstTimeUser
    : Cookies.get('firstTimeUser') || true;
  const firstTimeUserValue = value => {
    if (value === undefined) return true;
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  };
  ctx.store.dispatch({
    type: 'TOGGLE_FIRST_TIME_USER',
    status: firstTimeUserValue(firstTimeUser)
  });
  // SEO Data
  const showSEOMessage = ctx.req
    ? ctx.req.cookies.showSEOMessage
    : Cookies.get('showSEOMessage') || true;
  const showSEOMessageValue = value => {
    if (value === undefined) return true;
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  };
  ctx.store.dispatch({
    type: 'TOGGLE_SEO_MESSAGE',
    status: showSEOMessageValue(showSEOMessage)
  });

  // Allow page components to get their requested getInitialProps
  let pageProps = {};
  if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx);
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withRedux(initStore)(Washco);
