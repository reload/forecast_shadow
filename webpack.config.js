/**
 * @file
 * webpack.config.js
 */

module.exports = {
  entry: './src/app.js',
  output: { filename: 'app.js', path: 'dist' },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }],
          ],
        },
      },
    ],
  },
};
