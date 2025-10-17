const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: {
      // Individual components (only existing ones)
      'card-layout-1': './src/components/card-layout-1/CardLayout1.js',
      // Complete bundle
      'bundle': './src/index.js'
    },
    
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: '[name].js',
      library: {
        type: 'umd',
        name: 'UniqodeCardTemplates'
      },
      globalObject: 'this',
      clean: true
    },
    
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: ['> 1%', 'last 2 versions', 'not dead']
                  },
                  modules: false
                }]
              ]
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    },
    
    optimization: {
      minimize: isProduction,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          shared: {
            name: 'shared',
            chunks: 'all',
            minChunks: 2
          }
        }
      }
    },
    
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    
    devServer: {
      static: {
        directory: path.join(__dirname, 'examples'),
      },
      port: 3001,
      hot: true,
      open: true,
      compress: true,
      historyApiFallback: true
    },
    
    resolve: {
      extensions: ['.js', '.css'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@shared': path.resolve(__dirname, 'src/shared'),
        '@styles': path.resolve(__dirname, 'src/styles')
      }
    }
  };
};

