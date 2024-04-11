const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files
  output: "standalone",
  // the output: 'standalone' option should now work from the latest 12.2.0 release
  experimental: {
    outputStandalone: true,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
