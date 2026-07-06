import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "31.97.235.122" },
      { protocol: "https", hostname: "**" },
    ],
  },
  allowedDevOrigins: ['clingore.com', '31.97.235.122'],
};
export default nextConfig;
