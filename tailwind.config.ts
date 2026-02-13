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
                "slide-down": "slideDown 0.5s ease-out forwards",
                "slide-left": "slideLeft 0.6s ease-out forwards",
                "slide-right": "slideRight 0.6s ease-out forwards",
                "scale-in": "scaleIn 0.5s ease-out forwards",
                "pulse-soft": "pulseSoft 2s ease-in-out infinite",
                "float": "float 6s ease-in-out infinite",
                "float-delayed": "float 6s ease-in-out 3s infinite",
                "shimmer": "shimmer 2.5s ease-in-out infinite",
                "spin-slow": "spin 8s linear infinite",
                "bounce-subtle": "bounceSubtle 2s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
                "marquee": "marquee 25s linear infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(40px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideDown: {
                    "0%": { opacity: "0", transform: "translateY(-20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideLeft: {
                    "0%": { opacity: "0", transform: "translateX(60px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                slideRight: {
                    "0%": { opacity: "0", transform: "translateX(-60px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                scaleIn: {
                    "0%": { opacity: "0", transform: "scale(0.9)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                pulseSoft: {
                    "0%, 100%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.05)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                bounceSubtle: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-8px)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 20px rgba(200, 164, 92, 0.2)" },
                    "100%": { boxShadow: "0 0 40px rgba(200, 164, 92, 0.4)" },
                },
                marquee: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gold-shimmer":
                    "linear-gradient(110deg, transparent 25%, rgba(200,164,92,0.1) 37%, transparent 63%)",
            },
        },
    },
    plugins: [],
};

export default config;
