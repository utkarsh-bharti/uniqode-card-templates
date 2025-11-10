import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  entry: {
    // Main bundle with all components
    index: './src/index.js',
    // Individual component bundles for selective loading
    'card-layout-1': './src/components/card-layout-1/CardLayout1.js',
    'card-layout-2': './src/components/card-layout-2/CardLayout2.js',
    'card-layout-3': './src/components/card-layout-3/CardLayout3.js',
    'card-layout-4': './src/components/card-layout-4/CardLayout4.js',
    'card-layout-5': './src/components/card-layout-5/CardLayout5.js',
    'card-layout-6': './src/components/card-layout-6/CardLayout6.js',
    'card-layout-7': './src/components/card-layout-7/CardLayout7.js',
    'card-layout-8': './src/components/card-layout-8/CardLayout8.js',
    'card-layout-9': './src/components/card-layout-9/CardLayout9.js',
    'card-layout-11': './src/components/card-layout-11/CardLayout11.js',
    'card-layout-12': './src/components/card-layout-12/CardLayout12.js',
    'card-layout-comprehensive': './src/components/card-layout-comprehensive/CardLayoutComprehensive.js'
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
