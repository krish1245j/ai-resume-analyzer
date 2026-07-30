/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#08070d",
          soft: "#0c0a14",
        },
        surface: {
          DEFAULT: "#121019",
          light: "#171420",
          border: "rgba(245,243,255,0.08)",
          borderStrong: "rgba(245,243,255,0.14)",
        },
        ink: {
          DEFAULT: "#f5f3ff",
          dim: "#c9c5db",
          faint: "#8b869e",
        },
        brand: {
          violet: "#7e14ff",
          violetLight: "#a374ff",
          violetDeep: "#4c0adb",
          cyan: "#47bfff",
          cyanDeep: "#1f8fd6",
        },
        signal: {
          success: "#34d399",
          successBg: "rgba(52,211,153,0.12)",
          warning: "#fbbf24",
          warningBg: "rgba(251,191,36,0.12)",
          danger: "#fb7185",
          dangerBg: "rgba(251,113,133,0.12)",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(126,20,255,0.15), 0 20px 60px -20px rgba(126,20,255,0.45)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 50px -25px rgba(0,0,0,0.7)",
        soft: "0 10px 30px -15px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(8,7,13,0) 0%, #08070d 90%), radial-gradient(circle at 1px 1px, rgba(245,243,255,0.06) 1px, transparent 0)",
        "aurora":
          "radial-gradient(60% 50% at 20% 10%, rgba(126,20,255,0.35) 0%, rgba(126,20,255,0) 60%), radial-gradient(50% 40% at 85% 20%, rgba(71,191,255,0.25) 0%, rgba(71,191,255,0) 60%)",
        "cta-gradient": "linear-gradient(90deg, #7e14ff 0%, #a374ff 50%, #47bfff 100%)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-4%, 3%) scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        ring: {
          "0%": { strokeDashoffset: "var(--ring-start, 283)" },
          "100%": { strokeDashoffset: "var(--ring-end, 0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out both",
        slideUp: "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
        drift: "drift 14s ease-in-out infinite",
        shimmer: "shimmer 1.6s ease-in-out infinite",
        ring: "ring 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [],
};
