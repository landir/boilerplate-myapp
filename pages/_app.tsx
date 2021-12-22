import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import createCache from '@emotion/cache';
import TopBar from 'src/components/TopBar';
import { SettingsProvider } from 'src/hooks/SettingsContext';
import MyThemeProvider from 'src/theme/themeProvider';
import { appWithTranslation } from 'next-i18next';
import CookiesNotification from 'src/components/CookiesNotification';

export const cache = createCache({ key: 'css', prepend: true });

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%'
    },
    wrapper: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      paddingTop: 64
    },
    contentContainer: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden'
    },
    content: {
      flex: '1 1 auto',
      height: '100%',
      overflow: 'auto'
    }
  })
);

const MyApp = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;
  const classes = useStyles();

  React.useEffect(() => {
    interface jssStyles {
      parentElement?: HTMLElement;
    }
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={cache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>My APP</title>
      </Head>
      <SettingsProvider>
        <MyThemeProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <CookiesNotification />
          <div className={classes.root}>
            <TopBar />
            <div className={classes.wrapper}>
              <div className={classes.contentContainer}>
                <main className={classes.content}>
                  <Component {...pageProps} />
                </main>
              </div>
            </div>
          </div>
        </MyThemeProvider>
      </SettingsProvider>
    </CacheProvider>
  );
};

export default appWithTranslation(MyApp);
