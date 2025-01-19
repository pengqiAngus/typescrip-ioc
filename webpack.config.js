const { resolve } = require("path");

module.export = {
  entry: {
    main: resolve("src/index.ts"),
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "swc-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"], // 解析的文件扩展名
  },
};
