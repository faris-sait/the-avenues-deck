import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // District photos are 1920px wide max — there's no value in 2048/3840
    // variants and they're slow to encode on dev mode. Capping at 1920 keeps
    // dev fast and shrinks the SSR'd srcSet.
    deviceSizes: [640, 750, 828, 1080, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allowed <Image quality> values — 75 (default) and 90 (PosterTile photos).
    qualities: [75, 90],
  },
};

export default nextConfig;
