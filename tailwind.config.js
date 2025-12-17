/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./App.tsx"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Inter"', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
                manrope: ['Manrope', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                brand: {
                    50: '#fff0f0',
                    100: '#ffdede',
                    400: '#ff4d4d',
                    500: '#ff0000',
                    600: '#CB0001', // Updated to match Logo Red
                    700: '#a30000', // Darker shade
                    800: '#990000',
                    DEFAULT: '#CB0001', // Updated to match Logo Red
                    dark: '#111111', // Swiss Design often uses stark black/white
                    gray: '#333333',
                    // New Corporate Page Colors
                    red: '#CB0001', // Updated to match Logo Red
                    'swiss-dark': '#0B0F19',
                    'swiss-gray': '#F5F5F7',
                    text: '#1A1A1A'
                },
                neutral: {
                    900: '#0f172a',
                }
            },
            boxShadow: {
                'card': '0 2px 10px rgba(0,0,0,0.03)', // Subtler, cleaner shadows
                'card-hover': '0 10px 30px rgba(230, 0, 0, 0.1)', // Red glow on hover
            },
            backgroundImage: {
                'swiss-grid': "radial-gradient(#E5E7EB 1px, transparent 1px)"
            },
            animation: {
                'infinite-scroll': 'scroll 30s linear infinite',
            },
            keyframes: {
                width: {
                    '0%': { width: '0%' },
                    '100%': { width: '100%' },
                }
            },
        }
    },
    plugins: [],
}
