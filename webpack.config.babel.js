import { resolve } from 'path';
import webpack from 'webpack';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import progressBar from 'progress-bar-webpack-plugin';
import html from 'html-webpack-plugin';
import uglifyJS from 'uglifyjs-webpack-plugin';
import miniCSSExtract from 'mini-css-extract-plugin';
import optimizeCSSAssets from 'optimize-css-assets-webpack-plugin';
import stylelint from 'stylelint-webpack-plugin';

export default env => {
  const { ifProd, ifNotProd } = getIfUtils(env);

  return {
    mode: 'none',
    optimization: {
      minimizer: [
        new uglifyJS({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new optimizeCSSAssets({})
      ]
    },
    entry: './src/index.js',
    output: {
      filename: 'app.js',
      path: resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: [
        '*',
        '.js',
        '.jsx'
      ]
    },
    module: {
      rules: removeEmpty([
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ]
        },
        {
          test: /\.css$/,
          use: [ 
            ifProd(miniCSSExtract.loader, 'style-loader'),
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-cssnext')()
                ],
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        }
      ])
    },
    plugins: removeEmpty([
      new progressBar(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: ifProd('"production"', '"development"')
        }
      }),
      new html({
        template: resolve(__dirname, './src/index.html')
      }),
      ifProd(new miniCSSExtract({
        filename: 'app__[hash].css',
        chunkFilename: 'app__[hash].css'
      })),
      new stylelint({
        configFile: '.stylelintrc',
        context: 'src',
        files: '**/*.css',
        failOnError: false,
        quiet: false,
      })
    ])
  }
}
