const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['**/src/**/*.ts', '**/src/**/*.vue'],
  theme: {
    colors: {
      'dark-100': '#16161a',
      'dark-200': '#212126',
      'dark-300': '#242429',
      'dark-400': '#2b2b32',
      'dark-500': '#313139',
      'dark-600': '#43434e',
      'dark-700': '#555866',
      'dark-800': '#8e92a1',
      'dark-900': '#eeeeee',
      'brand-200': '#4a403a',
      'brand-300': '#55443c',
      'brand-400': '#704e38',
      'brand-500': '#885e43',
      'brand-600': '#a37f5c',
      'brand-700': '#cca471',
      'brand-800': '#c4a68a',
      'brand-900': '#ffe3c0',
      'notification-success': '#4caf50',
      'notification-error': '#ff5252',
      'item-grade-1': '#83a545',
      'item-grade-2': '#458dcb',
      'item-grade-3': '#f3b93c',
      'item-grade-4': '#ce5e4a',
      'item-icon-highlight': '#b92511',
      'item-stat-highlight': '#ffce22',
      'item-category': '#839364',
      'item-price': '#d7c77e',
      'item-durability': '#d30f09',
      'item-availability-bg-1': '#333845',
      'item-availability-bg-2': '#482c29',
      'item-availability-text-1': '#f6465a',
      'item-availability-text-2': '#92b2d8',
      'fluctuation-type-1': '#2b3a46',
      'fluctuation-type-2': '#56302a',
      'chart-0': '#0000ff',
      'chart-40': '#8888ff',
      'chart-50': '#ffffff',
      'chart-60': '#ff8888',
      'chart-100': '#ff0000',
    },
    fontFamily: {
      'dejavu-sans': 'DejaVu Sans',
      'dejavu-sans-condensed': 'DejaVu Sans Condensed',
    },
    extend: {
      minWidth: {
        '1/5': '20%',
      },
      height: {
        'dynamic-screen': '100dvh',
      },
    },
  },
  plugins: [
    plugin(function (plugin) {
      plugin.addVariant('hocus', ['&:hover', '&:focus-visible']);
    }),
  ],
};
