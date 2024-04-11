import { CacheProvider } from "@emotion/react";
import Head from "next/head";

export default ({ emotionCache, children }) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      {children}
    </CacheProvider>
  );
};
