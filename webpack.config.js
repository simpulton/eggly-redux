import webpack from "webpack";
import path from 'path';

const root = 'client';

module.exports = {
  devtool: 'sourcemap',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, root)
  },
  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, root, 'app/app.js'),
    ]
  },
  module: {
    loaders: [
       { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel' },
       { test: /\.html$/, loader: 'raw' },
       { test: /\.css$/, loader: 'style!css' },
       { test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: 'url' }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
