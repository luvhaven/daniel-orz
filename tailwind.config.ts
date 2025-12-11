import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                    50: "#f0f9ff",
                    100: "#e0f2fe",
                    200: "#bae6fd",
                    300: "#7dd3fc",
                    400: "#38bdf8",
                    500: "#0ea5e9",
                    600: "#0284c7",
                    700: "#0369a1",
                    800: "#075985",
                    900: "#0c4a6e",
                    950: "#082f49",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                    50: "#faf5ff",
                    100: "#f3e8ff",
                    200: "#e9d5ff",
                    300: "#d8b4fe",
                    400: "#c084fc",
                    500: "#a855f7",
                    600: "#9333ea",
                    700: "#7e22ce",
                    800: "#6b21a8",
                    900: "#581c87",
                    950: "#3b0764",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                    50: "#fff7ed",
                    100: "#ffedd5",
                    200: "#fed7aa",
                    300: "#fdba74",
                    400: "#fb923c",
                    500: "#f97316",
                    600: "#ea580c",
                    700: "#c2410c",
                    800: "#9a3412",
                    900: "#7c2d12",
                    950: "#431407",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
                mono: ["var(--font-jetbrains-mono)", "monospace"],
            },
            fontSize: {
                "hero": ["clamp(3rem, 10vw, 8rem)", { lineHeight: "1", fontWeight: "800" }],
                "display": ["clamp(2.5rem, 8vw, 6rem)", { lineHeight: "1.1", fontWeight: "700" }],
                "headline": ["clamp(2rem, 6vw, 4rem)", { lineHeight: "1.2", fontWeight: "600" }],
            },
            animation: {
                "fade-in": "fade-in 0.5s ease-in-out",
                "fade-up": "fade-up 0.5s ease-out",
                "fade-down": "fade-down 0.5s ease-out",
                "slide-in-left": "slide-in-left 0.5s ease-out",
                "slide-in-right": "slide-in-right 0.5s ease-out",
                "scale-in": "scale-in 0.3s ease-out",
                "bounce-subtle": "bounce-subtle 2s infinite",
                "pulse-subtle": "pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "gradient": "gradient 8s linear infinite",
                "float": "float 6s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite",
                "shimmer": "shimmer 2s linear infinite",
                "reveal": "reveal 1s ease-in-out",
            },
            keyframes: {
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-down": {
                    "0%": { opacity: "0", transform: "translateY(-30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "slide-in-left": {
                    "0%": { opacity: "0", transform: "translateX(-100px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                "slide-in-right": {
                    "0%": { opacity: "0", transform: "translateX(100px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                "scale-in": {
                    "0%": { opacity: "0", transform: "scale(0.9)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                "bounce-subtle": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "pulse-subtle": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.7" },
                },
                "gradient": {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "glow": {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(14, 165, 233, 0.3)" },
                    "50%": { boxShadow: "0 0 40px rgba(14, 165, 233, 0.6)" },
                },
                "shimmer": {
                    "0%": { backgroundPosition: "-1000px 0" },
                    "100%": { backgroundPosition: "1000px 0" },
                },
                "reveal": {
                    "0%": { clipPath: "inset(0 100% 0 0)" },
                    "100%": { clipPath: "inset(0 0 0 0)" },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "gradient-mesh": "url('/mesh-gradient.svg')",
            },
            backdropBlur: {
                xs: "2px",
            },
            spacing: {
                "18": "4.5rem",
                "88": "22rem",
                "100": "25rem",
                "128": "32rem",
            },
            borderRadius: {
                "4xl": "2rem",
                "5xl": "2.5rem",
            },
            boxShadow: {
                "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
                "glass-lg": "0 12px 48px 0 rgba(31, 38, 135, 0.12)",
                "glow-sm": "0 0 15px rgba(14, 165, 233, 0.5)",
                "glow": "0 0 30px rgba(14, 165, 233, 0.6)",
                "glow-lg": "0 0 50px rgba(14, 165, 233, 0.7)",
                "neon": "0 0 5px theme('colors.primary.400'), 0 0 20px theme('colors.primary.600')",
            },
            transitionDuration: {
                "400": "400ms",
                "600": "600ms",
                "800": "800ms",
                "2000": "2000ms",
            },
        },
    },
    plugins: [],
};

export default config;
