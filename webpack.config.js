const HtmlPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require("fs");
const path = require("path");

const root = path.resolve("src");
const files = fs.readdirSync(root).reduce(
  (all, current) => {
    const ext = path.extname(current);
    const name = path.basename(current, ext);
    const absPath = path.join(root, current);

    if (!all.hasOwnProperty(ext)) {
      all[ext] = [];
    }

    all[ext].push({ name, absPath });

    return all;
  },
  { ".js": [], ".html": [] }
);
const entries = files[".js"].reduce((all, { name, absPath }) => {
  all[name] = absPath;

  return all;
}, {});
const html = files[".html"]
  .filter(file => entries.hasOwnProperty(file.name))
  .map(file => {
    return new HtmlPlugin({
      title: file.name,
      template: file.absPath,
      filename: `${file.name}.html`,
      chunks: [file.name]
    });
  });

if (!html.length || !files[".html"].find(file => file.name === "index")) {
  html.push(
    new HtmlPlugin({
      title: "index",
      template: "index.html",
      chunks: ["index"]
    })
  );
}

module.exports = {
  entry: entries,
  output: {
    filename: "[name].[hash].js",
    path: path.resolve("build")
  },
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: "file-loader",
        options: {
          name: "[hash:8].[ext]",
          outputPath: "resources"
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("postcss-import")(),
                require("postcss-simple-vars")(),
                require("postcss-calc")(),
                require("postcss-nested"),
                require("autoprefixer")(),
                require("postcss-reporter")()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    ...html,
    new CleanWebpackPlugin(["build"])
  ]
};
