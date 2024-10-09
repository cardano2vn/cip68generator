/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['@meshsdk/core', '@meshsdk/core-cst', '@meshsdk/react'],
    experimental: {
        after: true,
    },
    output: 'standalone',
    reactStrictMode: true,
    webpack: function (config, _) {
        config.experiments = {
            asyncWebAssembly: true,
            layers: true,
        };
        return config;
    },
};

export default nextConfig;
