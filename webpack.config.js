const { createWebpackLibraryConfig } = require('./webpack/build-library');

module.exports = createWebpackLibraryConfig({ type: 'umd', name: 'utils', entry: './index.js', output: './dist'})(__dirname);