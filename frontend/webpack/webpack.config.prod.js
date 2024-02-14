
module.exports = {
  mode: 'production',
  module: {
    rules: require('./webpack.rules'),
  },
  entry: ['./src/index.tsx'],
  output: {
    publicPath: '/',
    //path: 'build',
    clean: true,
    filename: '[name].bundle.js'
    // filename: '[name].[chunkhash].js',
    //chunkFilename: '[name].[chunkhash].chunk.js',
  },
  plugins: [...require('./webpack.plugins')],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      // Custom Aliases
      ...require('./webpack.aliases'),
    },
  },
  stats: 'errors-warnings',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    minimize: true,
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
  },
};
