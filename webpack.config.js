const { resolve, join } = require('path');
const dist = resolve(__dirname, 'dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');

const commonConfig = {
  entry: './src/app.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json'
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: dist
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, 'node_modules/@webcomponents'),
        to: join(dist, 'vendor'),
        ignore: ['**/*.js.map'],
        toType: 'dir'
      }
    ])
  ]
};

const developmentConfig = {
  devServer: {
    contentBase: dist,
    compress: true,
    port: 8080
  }
};

const productionConfig = {};

module.exports = (env, options) => {
  const { mode } = options;
  return mode === 'production'
    ? merge(commonConfig, productionConfig, { mode })
    : merge(commonConfig, developmentConfig, { mode });
};
