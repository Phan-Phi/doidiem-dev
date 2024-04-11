import Head from "next/head";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
import { ErrorBoundary } from "react-error-boundary";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Script from "next/script";
import createEmotionCache from "../libs/createEmotionCache";

import { useRouting } from "../hooks";
import { Layout, ErrorFallback } from "../components";
import { Cache as EmotionCache, Theme as CustomMuiTheme, SWR } from "../HOC";

//

import "../axios.config";
import "../styles/global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../node_modules/nprogress/nprogress.css";

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  useRouting();

  return (
    <EmotionCache emotionCache={emotionCache}>
      <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_SITE_KEY}>
        <CustomMuiTheme>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <SWR fallback={pageProps?.fallback}>
              <SnackbarProvider autoHideDuration={4000} maxSnack={3}>
                <Layout>
                  <Head>
                    <meta
                      name="viewport"
                      content="width=device-width, initial-scale=1, maximum-scale=1"
                    />
                  </Head>
                  <Script
                    strategy={"lazyOnload"}
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-2NLTNC6GJV%22%3E"
                  ></Script>

                  <Script strategy={"lazyOnload"}>
                    {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-2NLTNC6GJV');`}
                  </Script>
                  <CssBaseline />
                  <Component {...pageProps} />
                </Layout>
              </SnackbarProvider>
            </SWR>
          </ErrorBoundary>
        </CustomMuiTheme>
      </GoogleReCaptchaProvider>
    </EmotionCache>
  );
}

export default MyApp;
