import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import createEmotionServer from '@emotion/server/create-instance';
import { cache } from './_app';

const { extractCritical } = createEmotionServer(cache);

export default class MyDocument extends Document {
  url = (e: string): string => `${process.env.NEXT_PUBLIC_HOST}/${e}`;
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* PWA primary color */}
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#eeeeee" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <meta name="description" content="ver https://gist.github.com/lancejpollard/1978404 easy to integrate." />
          <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />

          <meta property="og:title" content="My APP Title" />
          <meta property="og:description" content="Offering tour packages for javascript." />
          <meta property="og:image" content="http://landir.com.br/thumbnail.jpg" />
          <meta property="og:url" content="http://landir.com.br/index.htm" />
          <meta name="twitter:card" content="summary_large_image" />

          <meta property="og:site_name" content="My APP Site." />
          <meta name="twitter:image:alt" content="Alt text for image" />

          <meta property="fb:app_id" content="landir" />
          <meta name="twitter:site" content="@landir" />

          {['en', 'en-US', 'en-GB'].map((e: string) => {
            return <link key={e} rel="alternate" href={this.url(e)} hrefLang={e} />;
          })}
          {['pt-BR', 'pt'].map((e: string) => {
            return <link key={e} rel="alternate" href={this.url('')} hrefLang={e} />;
          })}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);
  const styles = extractCritical(initialProps.html);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
      <style
        key="emotion-style-tag"
        data-emotion={`css ${styles.ids.join(' ')}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: styles.css }}
      />
    ]
  };
};
