import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Official district photography now ranges from 1920px marketing crops up
    // to 4.8k originals. Allow a 2560px candidate so large desktop and retina
    // renders stay crisp without generating an unnecessarily huge srcSet.
    deviceSizes: [640, 750, 828, 1080, 1280, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allowed <Image quality> values — 75 (default) and 90 (hero/poster photos).
    qualities: [75, 90],
  },
};

export default nextConfig;
