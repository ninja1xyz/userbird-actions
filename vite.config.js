import { defineConfig } from 'vite';

export const emv = () => defineConfig({
  define: {
    'import.meta.env.VITE_URL': JSON.stringify(process.env.VITE_URL || 'https://default.url.com')
  },
});

export default {
  build: {
    lib: {
      entry: './src/index.js',
      name: 'UserBirdToolbar',
      fileName: (format) => `userbird-toolbar.${format}.js`,
    },
  },
};