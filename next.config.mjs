import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
                pathname: '/v0/b/ethnicityviet-47a8d.appspot.com/o/**',
            },
        ],
        unoptimized: true
    }
};

export default withNextIntl(nextConfig);