import path from 'path';
import webpack from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
      contentBase: path.resolve(__dirname,'src')
  },
  plugins: [
    //Use CommonChunckPlugin to create a separate bundle
    //of vendor libraries so that they are cached separately
    new webpack.optimize.CommonsChunkPlugin ({
      name: 'vendor' //value of name is the sme as the entry point
    }),

    //create html file that includes reference to bundled JS
    new HtmlWebpackPlugin ({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttribute: true,
        keepClosingSlash: true,
        minifyJs: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true //so we delete the script tag in html since the scrip would be injected
    }),

    //Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),
    //Minify JS
    new webpack.optimize.UglifyJsPlugin(),
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
};
