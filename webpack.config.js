/**
 * @file
 * webpack.config.js
 */

 const path = require('path')

module.exports = {
  entry: './src/app.js',
  output: { filename: 'app.js', path: path.join(__dirname, 'dist') },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }]
          ]
        }
      }
    ]
  }
}
