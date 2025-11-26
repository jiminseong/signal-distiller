/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#05060c",
        panel: "#0b0f1a",
        panelAlt: "#0f1524",
        accent: "#7bf0c1",
        accentMuted: "#6dd5ff",
        muted: "#9aa7b8",
        divider: "#1c2536",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "SFMono-Regular", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(123, 240, 193, 0.35), 0 15px 50px rgba(0,0,0,0.45)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
