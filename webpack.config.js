const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode:'production',
    // mode:'development',
    entry: { content: ['./build_test/content.js']},
    output: {
        publicPath: '',
        path: __dirname + '/build_test/',
        filename: 'contentscript.js',

    },
    devServer: {
        static : {
          directory : __dirname + '/build_test/'
        },
        port: 6009,
        hot: true
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
  },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', ["@babel/preset-react", {"runtime": "automatic"}]],
                plugins: [
                  ["@babel/plugin-transform-runtime", {
                    "regenerator": true
                  }]
                ] 
              }
            }
          },
          {
            test: /\.css$/i,
            use: ["style-loader", {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                },
              }
            }
          ],
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          },
        ]
      }
  };