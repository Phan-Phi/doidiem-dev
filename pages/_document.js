import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import Script from "next/script";
import createEmotionCache from "../libs/createEmotionCache";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () => {
      return originalRenderPage({
        enhanceApp: (App) => {
          return (props) => {
            return <App emotionCache={cache} {...props} />;
          };
        },
      });
    };

    const initialProps = await Document.getInitialProps(ctx);

    const emotionStyles = extractCriticalToChunks(initialProps.html);

    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(" ")}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      emotionStyleTags,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          {/* <script
            src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
            strategy="afterInteractive"
          />
          <script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-2NLTNC6GJV');`}
          </script> */}

          {process.env.NODE_ENV === "production" && (
            <meta
              http-equiv="Content-Security-Policy"
              content="upgrade-insecure-requests"
            ></meta>
          )}
          {this.props.emotionStyleTags}
        </Head>
        <body id="Home">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
