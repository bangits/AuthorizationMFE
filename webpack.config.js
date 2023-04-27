const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const { configureSharedWebpack } = require('./webpack.shared');
const packageJson = require('./package.json');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'atom',
    projectName: 'authorization',
    webpackConfigEnv,
    argv
  });

  return merge(defaultConfig, configureSharedWebpack(webpackConfigEnv), {
    output: {
      publicPath: '/'
    },

    devServer: {
      port: webpackConfigEnv.port || 9001,
      liveReload: false,
      hot: false,
      webSocketServer: false
    },
    externals: [/^@atom/, ...packageJson.externalDeps]
  });
};
