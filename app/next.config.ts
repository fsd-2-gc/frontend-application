import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    async rewrites() {
        const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:8000/v1";
        return [
            {
                source: "/api/external/:path*",
                destination: `${apiBaseUrl}/:path*`,
            },
        ];
    },
};

export default nextConfig;
