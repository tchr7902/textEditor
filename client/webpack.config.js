const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      'idb': 'idb/build/esm/index.js'
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'client/dist'),
    },
    compress: true,
    port: 3000,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new WebpackPwaManifest({
      name: 'Just Another Text Editor',
      short_name: 'J.A.T.E',
      description: 'A simple text editor PWA.',
      background_color: '#ffffff',
      theme_color: '#000000',
      icons: [
        {
          src: './favicon.ico',
          sizes: [96, 128, 192, 256, 384, 512],
        }
      ]
    }),
    new GenerateSW({
      swDest: 'service-worker.js',
      include: [/\.html$/, /\.js$/, /\.css$/, /\.ico$/, /\.json$/],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
};
