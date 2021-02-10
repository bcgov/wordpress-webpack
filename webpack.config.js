const Path = require("path");
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Webpack = require("webpack");


/**
 * Extend the WordPress default plugins to add or modify.
 *
 * @param {object} defaultConfig  Webpack config from WordPress. 
 */
const updatePlugins = (defaultConfig) => {
  let plugins = [
    // Used for copying assets, ie images, and fonts.
    new CopyWebpackPlugin([
      {
        from: Path.resolve( process.cwd(), 'src', 'assets'),
        to: '[path][name].[ext]',
      },
    ]),
    // Used to create only one chunk, instead of multiple chunks.
    new Webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    })
  ];

  defaultConfig.plugins.forEach( (element) =>  {
    // Update MiniCssExtractPlugin configurations.
    if (element instanceof MiniCssExtractPlugin ) {
      // Used for minifying css.
      plugins.push(
        new MiniCssExtractPlugin({
          filename: "styles/[name].css",
        }),
      );
    }
    // This is simply a pass-through.
    else {
      plugins.push( element )
    }
    
  });
  return plugins;
}

/**
 * This is update rules for js and jsx to include web components or any other bcgov repo.
 *
 * @param {object} defaultConfig Webpack config from WordPress. 
 */
const updateRules = ( defaultConfig ) => {
  let rules = [];
  defaultConfig.module.rules.forEach( (element ) => {
    if ( undefined === element.exclude  ){
      element.exclude = /node_modules\/(?!\@bcgov).*/
    }
    rules.push(element);
  });
  return rules;
}

/**
 * The main export, for webpack config object.
 *
 * @param {object} env Environment varibles.
 * @param {string} buildType  to determine if plugin or theme, to add additional bootstrap and fonts.
 */
const webpackConfig  = ( env, buildType="plugin" ) => {
  const isProduction = undefined === env || !env.development;
  let entry = {
    main: [
      Path.resolve( process.cwd(), 'src', 'scripts', 'app.js'),
      Path.resolve( process.cwd(), 'src', 'styles', 'app.scss'),
    ],
    admin: [
      Path.resolve( process.cwd(), 'src', 'scripts', 'admin.js'),
      Path.resolve( process.cwd(), 'src', 'styles', 'admin.scss'),
    ],
  };
  if ('theme' === buildType) {
    entry.bootstrap =  [
      Path.resolve( process.cwd(), 'src', 'scripts', 'bootstrap.js'),
      Path.resolve( process.cwd(), 'src', 'styles', 'bootstrap.scss'),
    ];
    entry.fonts = Path.resolve( process.cwd(), 'src', 'scripts', 'fonts.js');
  }
  return   {
    ...defaultConfig,
    entry,
    output: {
      path: Path.resolve( process.cwd(), 'dist/'),
      publicPath: "../../dist/",
      filename: "scripts/[name].js",
      chunkFilename: "scripts/js/[name].chunk.js",
    },

    mode: isProduction ? "production" : "development",
    devtool: !isProduction ? "#source-map" : undefined,
    optimization: {
      splitChunks: {
        chunks: "async",
        name: false,
      },
    },
    resolve: {
      extensions: [".sass", ".scss", ".css", ".js", ".json", ".jsx"],
      alias: {
        "~": Path.resolve( process.cwd()),
      },
    },
    stats: {
      hash: true,
      outputPath: true,
      assets: true,
      errors: true,
      errorDetails: true,
      warnings: true,
      reasons: true,
      source: true,
      children: false,
      modules: false,
      publicPath: true,
    },
    plugins: [
      ...updatePlugins(defaultConfig),
    ],
    module: {
      ...defaultConfig.module,
      rules: [
          ...updateRules(defaultConfig),
      ],
    },
  };
}


module.exports = { webpackConfig }