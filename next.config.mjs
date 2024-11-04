/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [
    "@meshsdk/core",
    "@meshsdk/core-cst",
    "@meshsdk/react",
  ],
  experimental: {
    after: true,
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.io",
        pathname: "/**",
      },
    ],
  },

  // output: "standalone",
  reactStrictMode: true,
  webpack: function (config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
};

export default nextConfig;
