import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:8000/v1/:path*",
            },
        ];
    },
};

export default nextConfig;
