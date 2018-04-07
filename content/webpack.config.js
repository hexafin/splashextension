const path = require("path")

module.exports = {
  entry: ["./content/src/index.js"],

  output: {
    filename: "content.js",
    path: path.join(__dirname, "../", "build"),
    publicPath: "/"
  },

  resolve: {
    extensions: [".js", ".jsx", ".scss", ".json"],
    modules: ["node_modules"]
  },

  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
        include: path.join(__dirname, "src"),
        query: {
          presets: ["es2015", "react"],
          plugins: [
            ["styled-jsx/babel", { plugins: ["styled-jsx-plugin-postcss"] }],
            "transform-object-rest-spread"
          ]
        }
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: "images/[hash]-[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
}

// ["styled-jsx/babel", { "plugins": ["styled-jsx-plugin-postcss"] }],
