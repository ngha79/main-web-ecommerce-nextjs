import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        private: "#f53d2d",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        "background-theme": "linear-gradient(-180deg,#f53d2d,#f63)",
      },
      minHeight: {
        layout: "calc(100vh - 144px)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "wiggle-in": {
          from: { right: "-5px", opacity: "0" },
          to: { right: "16px", opacity: "1" },
        },
        "wiggle-out": {
          from: { right: "16px", opacity: "1" },
          to: { right: "-5px", opacity: "0" },
        },
        "show-out": {
          from: { left: "0", bottom: "-16px" },
          to: { left: "0", bottom: "0" },
        },
        "show-in": {
          from: { left: "0", bottom: "0" },
          to: { left: "0", bottom: "-16px" },
        },
        "show-left": {
          "0%": {
            "-webkit-transform": "translateX(-10px)",
            transform: "translateX(-10px)",
            opacity: "0.8",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "show-right": {
          "0%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
            opacity: "1",
          },
          "100%": {
            "-webkit-transform": "translateX(-10px)",
            transform: "translateX(-10px)",
            opacity: "0.5",
            display: "none",
          },
        },
        show: {
          from: {
            height: "0",
          },
          to: {
            height: "100%",
          },
        },
        hide: {
          from: {
            height: "100%",
          },
          to: {
            height: "0",
            display: "none",
          },
        },
        "carousel-right-in": {
          from: { right: "0", opacity: "0" },
          to: { right: "16px", opacity: "1" },
        },
        "carousel-right-out": {
          from: { right: "16px", opacity: "1" },
          to: { right: "0", opacity: "0" },
        },
        "carousel-left-in": {
          from: { left: "0", opacity: "0" },
          to: { left: "16px", opacity: "1" },
        },
        "carousel-left-out": {
          from: { left: "16px", opacity: "1" },
          to: { left: "0", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "wiggle-in": "wiggle-in 0.35s ease-out",
        "wiggle-out": "wiggle-out 0.35s ease-out",
        "show-out": "show-out 0.2s ease-out",
        "show-in": "show-in 0.2s ease-out",
        "show-left":
          "show-left 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "show-right":
          "show-right 0.1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        show: "show 0.5s ease-out",
        hide: "hide 0.4s ease-out",
        "carousel-right-in": "carousel-right-in 0.4s ease-out",
        "carousel-right-out": "carousel-right-out 0.4s ease-out",
        "carousel-left-in": "carousel-left-in 0.4s ease-out",
        "carousel-left-out": "carousel-left-out 0.4s ease-out",
      },
      boxShadow: {
        login:
          "0 1px 2px 1px rgba(0, 0, 0, 0.1), 0 1px 3px 1px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
