import path from 'path';
import { fileURLToPath } from 'url';
import CopyPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  entry: {
    // Main bundle with CardLayout12
    index: './src/index.js',
    // Individual component bundle
    'card-layout-12': './src/components/premium/card-layout-12/CardLayout12.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      type: 'module'
    },
    clean: {
      keep: /\.d\.ts$/,  // Keep TypeScript definition files
    },
    assetModuleFilename: 'assets/[name][ext]'
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
      },
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/index.d.ts',
          to: 'index.d.ts',
          info: { minimized: true }
        },
        {
          from: 'src/types',
          to: 'types'
        }
      ],
    }),
  ],
  optimization: {
    splitChunks: false // Keep each bundle separate
  },
  externals: {
    // Don't bundle these - they should be provided by the consuming application
  }
};
