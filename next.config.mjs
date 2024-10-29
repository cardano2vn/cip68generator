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
    instrumentationHook: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "18.143.169.117",
        port: "8080",
        pathname: "/ipfs/**",
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
