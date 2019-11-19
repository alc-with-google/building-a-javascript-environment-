import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
      contentBase: path.resolve(__dirname,'src')
  },
  plugins: [
    //create html file that includes reference to bundled JS
    new HtmlWebpackPlugin ({
      template: 'src/index.html',
      inject: true //so we delete the script tag in html since the scrip would be injected
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
};
