import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "sigma-fundo": "#f4f7fb",
        "sigma-textoClaro": "#64748b",
        "sigma-azulClaro": "#16345f",
        "sigma-azulEscuro": "#07162c",
        "sigma-douradoClaro": "#e8c34d",
        "sigma-douradoEscuro": "#a5811f",
        "sigma-azul": {
          DEFAULT: "#0a1f3d",
          50: "#e6edf7",
          100: "#c2d1e9",
          200: "#9ab2d9",
          300: "#7293c8",
          400: "#547bba",
          500: "#3663ac",
          600: "#29518f",
          700: "#1b3c6d",
          800: "#122c52",
          900: "#0a1f3d",
        },
        "sigma-dourado": {
          DEFAULT: "#c9a227",
          50: "#fbf5e0",
          100: "#f5e6b3",
          200: "#efd580",
          300: "#e8c34d",
          400: "#e2b52a",
          500: "#c9a227",
          600: "#a5811f",
          700: "#7f6117",
          800: "#59420f",
          900: "#3d2d0a",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-sigma":
          "radial-gradient(circle at top, rgba(201,162,39,0.16), transparent 35%), linear-gradient(135deg, #07162c 0%, #0a1f3d 45%, #16345f 100%)",
      },
      boxShadow: {
        gold: "0 10px 30px rgba(201, 162, 39, 0.22)",
        blue: "0 10px 30px rgba(10, 31, 61, 0.18)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.45s ease-out forwards",
        "fade-in-up": "fade-in-up 0.55s ease-out forwards",
        "fade-in-down": "fade-in-down 0.55s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
