const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { DefinePlugin } = require('webpack');

// Configurations for sass, which also include global sass file parsing
const configureSass = (isDevelopment = true) => [
  {
    test: /\.module\.s(a|c)ss$/,
    use: [
      isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: isDevelopment
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: isDevelopment
        }
      },
      {
        loader: 'sass-resources-loader',
        options: {
          resources: path.resolve(__dirname, './src/sass/main.scss')
        }
      }
    ]
  },
  {
    test: /\.s(a|c)ss$/,
    exclude: /\.module.(s(a|c)ss)$/,
    use: [
      isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          sourceMap: isDevelopment
        }
      }
    ]
  }
];

const configureWatchOptions = () => ({
  aggregateTimeout: 500, // Delay before reloading
  poll: 1000, // Enable polling since fsevents are not supported in docker
  ignored: /node_modules/
});

// Aliases used for simplification imports
const configureAliases = () => ({
  '@': path.resolve(__dirname, './src')
});

const configPlugins = (webpackConfigEnv) => [
  new DefinePlugin({
    'process.env': JSON.stringify(webpackConfigEnv)
  })
];

const configureSharedWebpack = (webpackConfigEnv) => {
  const isDevelopment = !webpackConfigEnv.WEBPACK_BUILD;

  return {
    plugins: configPlugins(webpackConfigEnv),
    module: {
      rules: configureSass(isDevelopment)
    },
    resolve: {
      alias: configureAliases()
    },
    watchOptions: configureWatchOptions()
  };
};

module.exports = {
  configureAliases,
  configureSass,
  configureSharedWebpack,
  configureWatchOptions
};
