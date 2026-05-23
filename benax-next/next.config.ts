import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence lockfile-root warning since benax-next/ is nested under a parent repo.
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
  },
};

export default nextConfig;
