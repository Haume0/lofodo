import type { Config } from "tailwindcss";
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "lato": ["Lato", "sans-serif"],
        "jetbrains-mono": ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
