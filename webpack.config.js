const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  // ... other configuration options ...
  entry: "./src/index.tsx",
  mode: "development",

  devServer: {
    watchFiles: ["src/**/*"],
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },

  devtool: false,

  resolve: {
    alias: {
      data: path.resolve(__dirname, "src/data"),
    },
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Correct property name and provide the appropriate extensions
    // ... other resolve options ...
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/index.html", to: "index.html" }],
    }),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  // ... other configuration options ...
};
