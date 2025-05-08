const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',  // Use 'production' mode for optimized builds
  entry: './src/index.js',  // Update if your entry file is different
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',  // Name your output bundle file
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',  // Starts a server to show the report
      analyzerPort: 8888,      // Default port
      openAnalyzer: true,      // Automatically open the analyzer in the browser
    })
  ],
};
