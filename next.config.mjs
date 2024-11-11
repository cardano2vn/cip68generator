/** @type {import('next').NextConfig} */

const IPFS_GATEWAY = new URL(
  process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://ipfs.io/",
);

const nextConfig = () => ({
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
        protocol: IPFS_GATEWAY.protocol.slice(0, -1), // Remove trailing colon
        hostname: IPFS_GATEWAY.hostname,
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
  reactStrictMode: true,
  webpack: function (config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
});

export default nextConfig;
