/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    images: {
        unoptimized: true
    },
    output: "export"
};

module.exports = nextConfig;
