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
                brand: {
                    gold: "#C8A45C",
                    "gold-light": "#E8D5A3",
                    "gold-dark": "#A67C3D",
                    navy: "#1B2A4A",
                    "navy-light": "#2A3F6A",
                    "navy-dark": "#0F1A30",
                    cream: "#FDF8F0",
                    "cream-dark": "#F5EDE0",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                display: ["var(--font-playfair)", "Georgia", "serif"],
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-out forwards",
                "slide-up": "slideUp 0.6s ease-out forwards",
                "pulse-soft": "pulseSoft 2s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                pulseSoft: {
                    "0%, 100%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.05)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
