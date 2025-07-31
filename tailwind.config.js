/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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