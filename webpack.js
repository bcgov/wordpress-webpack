const Path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const Webpack = require("webpack");

module.exports = (env) => {
  const isProduction = undefined === env || !env.development;
  const config = {
    paths: {
      resources: Path.resolve(__dirname, "./src/"),
      assets: Path.resolve(__dirname, "./src/assets/"),
      dist: Path.resolve(__dirname, "./dist/"),
    },
    sourceMaps: !isProduction,
  };

  return {
    entry: {
      app: [
        Path.join(config.paths.resources, "scripts/app.ts"),
        Path.join(config.paths.resources, "styles/app.scss"),
      ],
      admin: [
        Path.join(config.paths.resources, "scripts/admin.ts"),
        Path.join(config.paths.resources, "styles/admin.scss"),
      ],
    },
    output: {
      path: config.distPath,
      publicPath: "dist",
      filename: "scripts/[name].js",
      chunkFilename: "js/[name].chunk.js",
    },
    context: config.paths.assets,
    mode: isProduction ? "production" : "development",
    devtool: config.sourceMaps ? "#source-map" : undefined,
    optimization: {
      splitChunks: {
        chunks: "async",
        name: false,
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
      new CleanWebpackPlugin(),
      /** This doesn't seem to re-copy after edit of style or script when using watch */
      new CopyWebpackPlugin([
        {
          from: config.paths.assets,
          to: config.paths.dist,
        },
      ]),
      new Webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),

      new MiniCssExtractPlugin({
        filename: "styles/[name].css",
      }),
      new WebpackAssetsManifest({
        // Options go here.
      }),
    ],
    resolve: {
      alias: {
        "~": config.paths.resources,
      },
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          include: config.paths.assets,
          use: "eslint",
        },
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
          exclude: /node_modules/,
          loader: "url-loader",
          options: {
            name: `[path][name].[ext]`,
          },
        },
        {
          test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
          include: /node_modules/,
          loader: "file-loader",
          options: {
            limit: 4096,
            outputPath: (url, resourcePath, context) => {
              return `/vendor/${url}`;
            },
            publicPath: "../vendor/",
            name: `[name].[ext]`,
          },
        },
        {
          test: /\.(s?css|ya?ml)/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: !isProduction,
              },
            },
            "css-loader",
          ],
        },
        {
          test: /\.(s?css|ya?ml)$/i,
          loader: "sass-loader",
          options: {
            sourceMap: true,
          },
        } 
      ],
    },
  };
};