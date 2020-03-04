const path = require('path');
module.exports = {
  mode: 'production',
  entry: './svgo.js',
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'svgo.js',
    libraryTarget: 'commonjs'
  },
  resolve: {
    alias: {
      fs: '@skpm/fs'
    }
  }
};
