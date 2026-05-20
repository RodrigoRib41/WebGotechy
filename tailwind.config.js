/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* Brand cyan (logo) — el color protagonista */
        brand: {
          DEFAULT: '#00E5FF',
          50: '#E0FAFE',
          100: '#B3F3FC',
          200: '#80EBFA',
          300: '#62EFFF',
          400: '#33E0FF',
          500: '#00E5FF',
          600: '#00B8D4',
          700: '#0097B0',
          800: '#006C80',
          900: '#003F4D',
        },
        /* Mantenemos `secondary` apuntando al cyan principal para no romper los componentes existentes */
        secondary: {
          DEFAULT: '#00E5FF',
          50: '#E0FAFE',
          100: '#B3F3FC',
          200: '#80EBFA',
          300: '#62EFFF',
          400: '#33E0FF',
          500: '#00E5FF',
          600: '#00B8D4',
          700: '#0097B0',
          800: '#006C80',
          900: '#003F4D',
        },
        /* `primary` = oscuro corporativo (footer, headers, texto fuerte) */
        primary: {
          DEFAULT: '#0A1929',
          50: '#E6E9ED',
          100: '#C2C9D2',
          200: '#8C97A6',
          300: '#56657A',
          400: '#2B3D55',
          500: '#0A1929',
          600: '#081523',
          700: '#06111C',
          800: '#040B13',
          900: '#02060A',
        },
        accent: {
          DEFAULT: '#1DE9B6',
          50: '#E0FBF4',
          100: '#B3F4E1',
          200: '#80ECCC',
          300: '#4DE4B7',
          400: '#1DE9B6',
          500: '#00C896',
          600: '#00A37A',
          700: '#007D5D',
          800: '#005740',
          900: '#003027',
        },
        whatsapp: '#25D366',
        ink: {
          DEFAULT: '#E6F0FA',
          muted: '#94A3B8',
        },
        surface: {
          DEFAULT: '#060E1A',
          soft: '#0A1626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
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
        'gradient-brand': 'linear-gradient(135deg, #00E5FF 0%, #1DE9B6 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #62EFFF 0%, #00E5FF 50%, #00B8D4 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0A1929 0%, #06111C 100%)',
        'gradient-radial': 'radial-gradient(circle at top, rgba(0, 229, 255, 0.18), transparent 60%)',
        'gradient-mesh':
          'radial-gradient(at 0% 0%, rgba(0, 229, 255, 0.22) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(29, 233, 182, 0.18) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(0, 184, 212, 0.18) 0px, transparent 50%)',
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
        'gradient-shift': 'gradient-shift 12s ease infinite',
        'scroll-x': 'scroll-x 40s linear infinite',
        'fade-up': 'fade-up 0.6s ease forwards',
        shimmer: 'shimmer 2.5s linear infinite',
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
      },
      boxShadow: {
        'glow-sm': '0 0 24px -8px rgba(0, 229, 255, 0.45)',
        'glow-md': '0 0 48px -8px rgba(0, 229, 255, 0.55)',
        'glow-lg': '0 0 80px -8px rgba(0, 229, 255, 0.45)',
        'glow-accent': '0 0 32px -8px rgba(29, 233, 182, 0.45)',
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
