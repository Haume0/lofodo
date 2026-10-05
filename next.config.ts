import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      // Admin uploads background gifs through a server action; the 1mb
      // default is below most of them.
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
