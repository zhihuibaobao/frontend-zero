const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    home: './index',
    practiceContext: './code-projects/react/practice-context/index.js',
    practiceContext1: './code-projects/react/practice-context/index1.js',
    practiceReact: './code-projects/react/practice-react/index.js',
    practiceRedux: './code-projects/react/practice-redux/index.js',
    practiceRedux1: './code-projects/react/practice-redux1/index.js',
    practiceRedux2: './code-projects/react/practice-redux2/index.js',
    practiceRedux3: './code-projects/react/practice-redux3/index.js',
    promise1: './code-javascript/promise1.js'
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: '/dist/',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  watch: true,
  devServer: {
    compress: true,
    port: 9000
  },
  devtool: 'cheap-module-eval-source-map'
}
