/** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//         serverActions: true
//     }
// }

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
});

module.exports = withPWA({
  experimental: {
    serverActions: true,
  },
  reactStrictMode: false,
});
