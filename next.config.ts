import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        // AVIF offers ~20% better compression than WebP; browser falls back to WebP
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
        // Optimized device sizes matching common breakpoints
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        // Smaller sizes for thumbnails and cards
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // Reduce quality slightly for faster loads (perceptually identical)
        minimumCacheTTL: 31536000, // 1 year cache for optimized images
    },
};

export default nextConfig;
