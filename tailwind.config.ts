import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        risk: {
          low: '#22c55e',      // green
          moderate: '#eab308', // yellow
          high: '#f97316',     // orange
          severe: '#ef4444',   // red
          catastrophic: '#7f1d1d', // dark red
        },
      },
    },
  },
  plugins: [],
};
export default config;
