// next.config.js
// const path = require("path");

/**  @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    baseURL: process.env.BASE_URL,
    REDIRECT_URI: process.env.REDIRECT_URI,
    NEXT_PUBLIC_RECAPTCHA_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_KEY,
    USDTTOKEN_ADDRESS: process.env.USDTTOKEN_ADDRESS,
    DSCTOKEN_ADDRESS: process.env.DSCTOKEN_ADDRESS,
    MULTISIG_WALLET: process.env.MULTISIG_WALLET,
    // CLIENT_ID: process.env.CLIENT_ID,
    // clientSecret: process.env.clientSecret,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.coingecko.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // images: {
  //   domains: ["res.cloudinary.com", "assets.coingecko.com"],
  // },
  devIndicators: {
    buildActivity: false,
  },
  webpack: (config, options) => {
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
  // reactStrictMode: true,
  // experimental: {
  //   reactRefresh: false, // Disables React Fast Refresh
  // },
};

module.exports = nextConfig;
