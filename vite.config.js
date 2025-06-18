export default {
  build: {
    lib: {
      entry: './src/index.js',
      name: 'UserBirdToolbar',
      fileName: (format) => `userbird-toolbar.${format}.js`,
    },
  },
};