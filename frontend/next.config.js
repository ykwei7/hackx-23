/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // ignore eslint during builds
  // context: https://stackoverflow.com/questions/73708050/azure-windows-webapp-error-eslint-must-be-installed-in-order-to-run-during-bui
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
