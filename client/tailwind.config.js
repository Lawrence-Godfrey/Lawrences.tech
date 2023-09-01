const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html',
        './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    '50': '#f0fdfa',
                    '100': '#ccfbf1',
                    '200': '#99f6e4',
                    '300': '#5eead4',
                    '400': '#2dd4bf',
                    '500': '#14b8a6',
                    '600': '#0d9488',
                    '700': '#0f766e',
                    '800': '#115e59',
                    '900': '#134e4a',
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('flowbite/plugin'),
        require('@tailwindcss/typography'),
    ],
    darkMode: 'class',
};
