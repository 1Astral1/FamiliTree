const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,vue}'],
    theme: {
        container: {
            center: true,
            padding: '1rem',
        },
        extend: {
            colors: {
                'custom-text-black': '#151515',
                'custom-grey': '#efeff0',
                'custom-grey-dark': '#848488',
                'custom-blue': '#007aff',
            },
        },
    },
    plugins: [
        plugin(function ({ addBase }) {
            addBase({
                '[type="search"]::-webkit-search-decoration': { display: 'none' },
                '[type="search"]::-webkit-search-cancel-button': { display: 'none' },
                '[type="search"]::-webkit-search-results-button': { display: 'none' },
                '[type="search"]::-webkit-search-results-decoration': { display: 'none' },
            });
        }),
    ],
};
