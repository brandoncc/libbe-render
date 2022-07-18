const { webpackConfig, merge } = require("shakapacker");
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.

module.exports = merge(webpackConfig, {
  plugins: [new ForkTSCheckerWebpackPlugin()],
});
