const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['**/src/**/*.vue'],
  theme: {
    colors: {
      'dark-100': '#16161a',
      'dark-200': '#212126',
      'dark-300': '#242429',
      'dark-400': '#2b2b32',
      'dark-500': '#313139',
      'dark-600': '#43434e',
      'light-100': '#eeeeee',
      'light-300': '#8e92a1',
      'brand-500': '#704e38',
      'brand-600': '#885e43',
      'brand-700': '#a37f5c',
      'item-grade-1': '#83a545',
      'item-grade-2': '#458dcb',
      'item-grade-3': '#f3b93c',
      'item-grade-4': '#ce5e4a',
      'item-icon-highlight': '#b92511',
      'fluctuation-type-1': '#2b3a46',
      'fluctuation-type-2': '#56302a',
    },
    fontFamily: {
      'dejavu-sans': 'DejaVu Sans',
      'dejavu-sans-condensed': 'DejaVu Sans Condensed',
    },
    extend: {},
  },
  plugins: [
    plugin(function (plugin) {
      plugin.addVariant('hocus', ['&:hover', '&:focus-visible']);
    }),
  ],
};
