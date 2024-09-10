/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#006980",
      },
      screens: {
        xs: "420px",
      },
      keyframes: {
        hide: {
          from: {
            opacity: "1",
          },
          to: {
            opacity: "0",
          },
        },
        slideIn: {
          from: {
            transform: "translateX(calc(100% + var(--viewport-padding)))",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        swipeOut: {
          from: {
            transform: "translateX(var(--radix-toast-swipe-end-x))",
          },
          to: {
            transform: "translateX(calc(100% + var(--viewport-padding)))",
          },
        },
        "shadow-pulse": {
          from: {
            "box-shadow": "0 0 0 rgba(00, 69, 80, 0.6)",
          },
          "50%": { "box-shadow": "0 0 0 6px rgba(00, 69, 80, 0.6)" },
          to: {
            "box-shadow": "0 0 0 8px rgba(00, 69, 80, 0)",
          },
        },
      },
      animation: {
        hide: "hide 100ms ease-in",
        slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        swipeOut: "swipeOut 100ms ease-out",
        "shadow-pulse":
          "1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s infinite normal both running shadow-pulse",
      },
      borderRadius: {
        // lg: "var(--radius)",
        // md: "calc(var(--radius) - 2px)",
        // sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
