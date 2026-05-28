/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* ============ BRANDBOOK GOTECHY 2025 ============ */
        /* Primario: Celeste #00F3FF — protagonista absoluto */
        'gt-cyan': {
          DEFAULT: '#00F3FF',
          50: '#E5FDFF',
          100: '#B8FAFF',
          200: '#8AF7FF',
          300: '#5CF4FF',
          400: '#2EF1FF',
          500: '#00F3FF',
          600: '#00C2CC',
          700: '#009199',
          800: '#006066',
          900: '#003033',
        },
        /* Secundario: Verde #00FF92 — solo CTAs/detalles */
        'gt-green': {
          DEFAULT: '#00FF92',
          50: '#E5FFF4',
          100: '#B8FFDD',
          200: '#8AFFC7',
          300: '#5CFFB1',
          400: '#2EFF9B',
          500: '#00FF92',
          600: '#00CC75',
          700: '#009958',
          800: '#00663B',
          900: '#00331D',
        },
        /* Escala de grises del brandbook */
        'gt-dark': {
          DEFAULT: '#0A0E1A',
          soft: '#141B2D',
          softer: '#1E293B',
        },
        'gt-gray': {
          DEFAULT: '#94A3B8',
          50: '#F5F5F5',
          100: '#E2E2E2',
          200: '#CFCFCF',
          300: '#B0B0B0',
          400: '#94A3B8',
          500: '#666666',
          600: '#4D4D4D',
          700: '#333333',
          800: '#1A1A1A',
          900: '#0A0A0A',
        },

        /* ============ Alias legacy (mantienen compatibilidad) ============ */
        /* `brand` y `secondary` ahora apuntan al celeste oficial #00F3FF */
        brand: {
          DEFAULT: '#00F3FF',
          50: '#E5FDFF',
          100: '#B8FAFF',
          200: '#8AF7FF',
          300: '#5CF4FF',
          400: '#2EF1FF',
          500: '#00F3FF',
          600: '#00C2CC',
          700: '#009199',
          800: '#006066',
          900: '#003033',
        },
        secondary: {
          DEFAULT: '#00F3FF',
          50: '#E5FDFF',
          100: '#B8FAFF',
          200: '#8AF7FF',
          300: '#5CF4FF',
          400: '#2EF1FF',
          500: '#00F3FF',
          600: '#00C2CC',
          700: '#009199',
          800: '#006066',
          900: '#003033',
        },
        /* `primary` = oscuro oficial del brandbook */
        primary: {
          DEFAULT: '#0A0E1A',
          50: '#E6E8EC',
          100: '#C2C6D0',
          200: '#8C95A6',
          300: '#56627A',
          400: '#2B3552',
          500: '#0A0E1A',
          600: '#080B16',
          700: '#060912',
          800: '#04070D',
          900: '#020408',
        },
        /* `accent` ahora apunta al verde secundario oficial #00FF92 */
        accent: {
          DEFAULT: '#00FF92',
          50: '#E5FFF4',
          100: '#B8FFDD',
          200: '#8AFFC7',
          300: '#5CFFB1',
          400: '#2EFF9B',
          500: '#00FF92',
          600: '#00CC75',
          700: '#009958',
          800: '#00663B',
          900: '#00331D',
        },
        whatsapp: '#25D366',
        ink: {
          DEFAULT: '#FFFFFF',
          muted: '#94A3B8',
        },
        surface: {
          DEFAULT: '#0A0E1A',
          soft: '#141B2D',
        },
      },
      fontFamily: {
        /* Degular Variable no está en Google Fonts; usamos Plus Jakarta Sans
           como fallback fiel: geométrica, redondeada, soporta variable weights. */
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        /* Brandbook: titulares ocupan hasta 1/3 del contenedor, lineheight 1.25 */
        'display-1': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-2': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-3': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      backgroundImage: {
        /* Brandbook: gradientes circulares (iluminaciones) sobre base oscura */
        'gradient-brand': 'linear-gradient(135deg, #00F3FF 0%, #00FF92 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #5CF4FF 0%, #00F3FF 50%, #00C2CC 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0A0E1A 0%, #141B2D 100%)',
        'gradient-radial': 'radial-gradient(circle at top, rgba(0, 243, 255, 0.18), transparent 60%)',
        /* Iluminaciones brandbook: cyan + verde sobre base oscura */
        'gradient-mesh':
          'radial-gradient(at 20% 20%, rgba(0, 243, 255, 0.18) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(0, 255, 146, 0.10) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(0, 243, 255, 0.08) 0px, transparent 50%)',
        'grid-pattern':
          'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-ring': 'pulse-ring 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 12s ease infinite',
        'scroll-x': 'scroll-x 40s linear infinite',
        'fade-up': 'fade-up 0.6s ease forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        'arrow-drift': 'arrow-drift 20s ease-in-out infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'arrow-drift': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-6px, -6px)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 24px -8px rgba(0, 243, 255, 0.45)',
        'glow-md': '0 0 48px -8px rgba(0, 243, 255, 0.55)',
        'glow-lg': '0 0 80px -8px rgba(0, 243, 255, 0.45)',
        'glow-accent': '0 0 32px -8px rgba(0, 255, 146, 0.45)',
        elevated: '0 20px 60px -20px rgba(0, 0, 0, 0.7)',
        card: '0 10px 30px -12px rgba(0, 0, 0, 0.5)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
