import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lofodo",
    short_name: "Lofodo",
    description:
      "An advanced study strategy, one-on-one for your best attention.",
    start_url: "/",
    display: "standalone",
    background_color: "#121212",
    theme_color: "#121212",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      // Logo inside the safe zone on a solid background, so Android can crop
      // it to any shape without cutting the rings.
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
