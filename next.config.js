/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    LIGHTHOUSE_API_KEY: process.env.LIGHTHOUSE_API_KEY,
  },
};

module.exports = nextConfig;
