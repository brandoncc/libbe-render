// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_tutorial_with_ssr_and_hmr_fast_refresh/blob/master/config/webpack/commonWebpackConfig.js

// Common configuration applying to client and server configuration
const { webpackConfig: baseClientWebpackConfig, merge } = require('shakapacker');
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const path = require('path');

const commonOptions = {
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '..', '..', 'app/javascript'),
      '@hooks': '@src/hooks',
      '@contexts': '@src/contexts',
      '@styles': '@src/styles',
      '@videos': path.resolve(__dirname, '..', '..', 'app/assets/videos'),
      '@components': '@src/components',
      '@libbe_configs': path.resolve(__dirname, '..', '..', 'libbe_configs'),
      React: 'react',
      ReactDOM: 'react-dom'
    },
    extensions: ['.css', '.ts', '.tsx'],
  },
  plugins: [new ForkTSCheckerWebpackPlugin()],
};

// Copy the object using merge b/c the baseClientWebpackConfig and commonOptions are mutable globals
const commonWebpackConfig = () => merge({}, baseClientWebpackConfig, commonOptions);

module.exports = commonWebpackConfig;
