import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  entry: {
    // Main bundle with CardLayout12
    index: './src/index.js',
    // Individual component bundle
    'card-layout-12': './src/components/card-layout-12/CardLayout12.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      type: 'module'
    },
    clean: {
      keep: /\.d\.ts$/,  // Keep TypeScript definition files
    }
  },
  experiments: {
    outputModule: true
  },
  module: {
    rules: [
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
    ]
  },
  optimization: {
    splitChunks: false // Keep each bundle separate
  },
  externals: {
    // Don't bundle these - they should be provided by the consuming application
  }
};
