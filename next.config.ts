import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xmydflnwcierojjartvk.supabase.co',
        port: '',
        pathname: '/**', // Start with broad permission to ensure it works immediately
      },
    ],
  },
};

export default nextConfig;
