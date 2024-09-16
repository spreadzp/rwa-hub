/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false
        }
        config.resolve.mainFields = ['browser', 'main', 'module']
        return config
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
                port: '',
            },
        ],
    },
};

export default nextConfig;

