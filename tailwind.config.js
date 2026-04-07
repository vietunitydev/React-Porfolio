/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: 'class',
    content: [
        "./src/app/**/*.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            colors: {
                theme: {
                    navy: '#1e3a8a',
                    'navy-strong': '#1e40af',
                },
            },
            borderRadius: {
                theme: '1rem',
            },
            boxShadow: {
                'theme-sm': '0 6px 18px rgba(15, 23, 42, 0.08)',
                'theme-md': '0 12px 28px rgba(15, 23, 42, 0.16)',
            },
        },
        typography: {
            DEFAULT: {
                css: {
                    p: {
                        marginTop: '0.5em',
                        marginBottom: '0.5em',
                    },
                    h1: {
                        marginTop: '1em',
                        marginBottom: '0.5em',
                    },
                },
            },
        },
    },
    plugins: [],
};

export default config;