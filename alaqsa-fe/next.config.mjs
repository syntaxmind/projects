/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        allowedDevOrigins: ["31.97.235.122", "localhost:8000"],
    },
};

export default nextConfig;
